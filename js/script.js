import { db } from './inicializador-firebase.js'; // Importando a instância do Firebase
import { getDoc, collection, getDocs, query, where, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.querySelectorAll('.buttonvermais').forEach(button => {

    button.addEventListener('click', function() {

        const dots = button.previousElementSibling.querySelector('.dots');
        const moreText = button.previousElementSibling.querySelector('.more');

        if (dots && moreText) {
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                button.textContent = "Ver mais";
                moreText.style.display = "none";
            } else {
                dots.style.display = "none";
                button.textContent = "Ver menos";
                moreText.style.display = "inline";
            }
        } else {
            console.warn('Elementos ".dots" ou ".more" não encontrados');
        }
    });
});

function normalizeString(str) {
    return str
        .normalize("NFD") // Decompor os caracteres em partes (e.g., "é" se torna "e" + acento)
        .replace(/[\u0300-\u036f]/g, "") // Remove os sinais diacríticos (acentos)
        .replace(/[^\w\s]/gi, "")
        .toLowerCase(); // Converte para minúsculas
}
document.getElementById("search-btn").addEventListener("click", () => {
    const searchTerm = document.getElementById("search-input").value;
    searchMovies(searchTerm);
});

// Função para buscar filmes com base no termo de pesquisa
async function searchMovies(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    const normalizedSearchTerm = normalizeString(searchTerm);
    const moviesRef = collection(db, "filmes");
    const q = query(
        moviesRef, 
        where("titleNormalized", ">=", normalizedSearchTerm), 
        where("titleNormalized", "<=", normalizedSearchTerm + '\uf8ff')
    );

    try {
        const querySnapshot = await getDocs(q);
        let results = [];

        querySnapshot.forEach((doc) => {
            const movieData = doc.data();
            results.push(movieData);
        });

        if (results.length > 0) {
            displayMovies(results); // Exibir os filmes encontrados
        } else {
            // Exibe uma mensagem caso não haja filmes encontrados
            displayNoResults();
        }
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}
function displayNoResults() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "<p>Nenhum filme encontrado.</p>";
}
// Função para exibir os filmes no HTML
function displayMovies(movies) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Limpar os resultados anteriores

    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            
            <a href="${movie.url}">
                <img src="${movie.imageUrl}" class="movie-img"/>
                ${movie.title}
            </a>
        `;

        resultsContainer.appendChild(movieDiv);
    });
}

export { searchMovies };

document.addEventListener("DOMContentLoaded", async function () {
    const sorteioContainer = document.getElementById("sorteio-filmes");

    async function obterFilmesDoFirebase() {
        const filmesCol = collection(db, "filmes");
        const filmesSnapshot = await getDocs(filmesCol);
        return filmesSnapshot.docs.map((doc) => doc.data());
    }

    function getSemanaAtual() {
        const hoje = new Date();
        const primeiroDiaAno = new Date(hoje.getFullYear(), 0, 1);
        const dias = Math.floor((hoje - primeiroDiaAno) / (24 * 60 * 60 * 1000));
        return hoje.getFullYear() + "-" + Math.ceil(dias / 7);
    }

    function sortearFilmes(filmes, quantidade) {
        const filmesSorteados = [];
        const indicesEscolhidos = new Set();

        while (filmesSorteados.length < quantidade && indicesEscolhidos.size < filmes.length) {
            const indiceAleatorio = Math.floor(Math.random() * filmes.length);
            if (!indicesEscolhidos.has(indiceAleatorio)) {
                filmesSorteados.push(filmes[indiceAleatorio]);
                indicesEscolhidos.add(indiceAleatorio);
            }
        }
        return filmesSorteados;
    }

    async function salvarFilmesSorteados(filmesSorteados, semanaAtual) {
        const sorteioRef = doc(db, "sorteios", semanaAtual);
        await setDoc(sorteioRef, { filmes: filmesSorteados });
    }

    async function obterFilmesSorteados(semanaAtual) {
        const sorteioRef = doc(db, "sorteios", semanaAtual);
        const snapshot = await getDoc(sorteioRef);
        return snapshot.exists() ? snapshot.data().filmes : null;
    }

    function exibirFilmesSorteados(filmesSorteados) {
        sorteioContainer.innerHTML = "";
        filmesSorteados.forEach((filme) =>{
            const filmeDiv = document.createElement("div");
            filmeDiv.classList.add("movie");

            filmeDiv.innerHTML = `
                <a href="${filme.url}">
                    <img src="${filme.imageUrl}" alt="${filme.title}" />
                    <h3>${filme.title}</h3>
                </a>
                
            `;
            sorteioContainer.appendChild(filmeDiv);
        });
    }

    async function gerenciarSorteio() {
        const semanaAtual = getSemanaAtual();
        let filmesSorteados = await obterFilmesSorteados(semanaAtual);

        if (!filmesSorteados) {
            const filmes = await obterFilmesDoFirebase();
            filmesSorteados = sortearFilmes(filmes, 5);
            await salvarFilmesSorteados(filmesSorteados, semanaAtual);
        }

        exibirFilmesSorteados(filmesSorteados);
    }

    gerenciarSorteio();
});