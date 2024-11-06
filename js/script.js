function verMais(button){
    var dots = button.previousElementSibling.querySelector(".dots");
    var moreText = button.previousElementSibling.querySelector(".more");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        button.innerHTML = "Ver mais";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        button.innerHTML = "Ver menos";
        moreText.style.display = "inline";
    }
}
let allMovies = [];

async function loadMovies() {
    try {
        const response = await fetch('filmes.json');
        allMovies = await response.json();
    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

function searchMovies() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");

    resultsContainer.innerHTML = ''; // Limpa resultados anteriores

    const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchInput));

    if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie-result';

            movieElement.innerHTML = `
                <a href="${movie.url}">
                    <img src="${movie.image}" alt="${movie.title}">
                    <p>${movie.title}</p>
                </a>
            `;

            resultsContainer.appendChild(movieElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>Nenhum filme encontrado</p>';
    }
}

// Carregar os filmes ao carregar a página
window.onload = loadMovies;