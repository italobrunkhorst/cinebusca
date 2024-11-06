// Importação do Firebase e Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Importando Firestore

// Seu objeto de configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCziuCm2Mxlh8TxQbcGUV9ogfNSek1OKxc",
  authDomain: "cinebusca-3c209.firebaseapp.com",
  projectId: "cinebusca-3c209",
  storageBucket: "cinebusca-3c209.firebasestorage.app",
  messagingSenderId: "64159991196",
  appId: "1:64159991196:web:3345ba66323a15abe9f459",
  measurementId: "G-QTEGDZTWDG"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Função para adicionar filmes ao Firestore
async function addMovies() {
    try {
        const movies = [
            
                {
                    title: "A Nova Cinderela",
                    imageUrl: "img/comediaromantica/anovacinderela.webp",
                    url: "categorias/comedia_romantica/page1.html#a-nova-cinderela"
                    },
                    {
                    title: "Juntos e Misturados",
                    imageUrl: "img/comediaromantica/juntosemisturados.webp",
                    url: "categorias/comedia_romantica/page1.html#juntos-e-misturados"
                    },
                    {
                    title: "Como Perder um Homem em 10 Dias",
                    imageUrl: "img/comediaromantica/comoperdeumhomemem10dias.webp",
                    url: "categorias/comedia_romantica/page1.html#como-perder-um-homem-em-10-dias"
                    },
                    {
                    title: "As Patricinhas de Beverly Hills",
                    imageUrl: "img/comediaromantica/aspatricinhasdebeverlyhills.jpg",
                    url: "categorias/comedia_romantica/page1.html#as-patricinhas-de-beverly-hills"
                    },
                    {
                    title: "Monte Carlo",
                    imageUrl: "img/comediaromantica/montecarlo.jpg",
                    url: "categorias/comedia_romantica/page1.html#monte-carlo"
                    },
                    {
                    title: "Casa Comigo?",
                    imageUrl: "img/comediaromantica/casacomigo.jpg",
                    url: "categorias/comedia_romantica/page1.html#casa-comigo?"
                    },
                    {
                    title: "Nunca fui Beijada",
                    imageUrl: "img/comediaromantica/nuncafuibeijada.webp",
                    url: "categorias/comedia_romantica/page1.html#nunca-fui-beijada"
                    },
                    {
                    title: "O Amor Não Tira Férias",
                    imageUrl: "img/comediaromantica/oamornaotiraferias.jpg",
                    url: "categorias/comedia_romantica/page2.html#o-amor-nao-tira-ferias"
                    },
                    {
                    title: "Vestida Para Casar",
                    imageUrl: "img/comediaromantica/vestidaparacasar.webp",
                    url: "categorias/comedia_romantica/page2.html#vestida-para-casar"
                    },
                    {
                    title: "Ligeiramente Grávidos",
                    imageUrl: "img/comediaromantica/ligeiramentegravidos.webp",
                    url: "categorias/comedia_romantica/page2.html#ligeiramente-gravidos"
                    },
                    {
                    title: "A Verdade Nua e Crua",
                    imageUrl: "img/comediaromantica/averdadenuaecrua.webp",
                    url: "categorias/comedia_romantica/page2.html#a-verdade-nua-e-crua"
                    },
                    {
                    title: "Esposa de Mentirinha",
                    imageUrl: "img/comediaromantica/esposadementirinha.jpg",
                    url: "categorias/comedia_romantica/page2.html#esposa-de-mentirinha"
                    },
                    {
                    title: "Três Vezes Amor",
                    imageUrl: "img/comediaromantica/tresvezesamor.webp",
                    url: "categorias/comedia_romantica/page2.html#tres-vezes-amor"
                    },
                    {
                    title: "Guerra é Guerra!",
                    imageUrl: "img/comediaromantica/guerraeguerra.webp",
                    url: "categorias/comedia_romantica/page2.html#guerra-e-guerra"
                    },
                    {
                    title: "Qual Seu Número?",
                    imageUrl: "img/comediaromantica/qualseunumero.jfif",
                    url: "categorias/comedia_romantica/page2.html#qual-seu-numero"
                    },
                    {
                    title: "A Casa das Coelhinhas",
                    imageUrl: "img/comediaromantica/acasadascoelhinhas.jpg",
                    url: "categorias/comedia_romantica/page2.html#a-casa-das-coelhinhas"
                    },
                    {
                    title: "Garota Mimada",
                    imageUrl: "img/comediaromantica/garotamimada.webp",
                    url: "categorias/comedia_romantica/page2.html#garota-mimada"
                    },
                    {
                    title: "Maldita Sorte",
                    imageUrl: "img/comediaromantica/malditasorte.webp",
                    url: "categorias/comedia_romantica/page3.html#maldita-sorte"
                    },
                    {
                    title: "Tudo Que Uma Garota Quer",
                    imageUrl: "img/comediaromantica/tudoqueumagarotaquer.webp",
                    url: "categorias/comedia_romantica/page3.html#tudo-que-uma-garota-quer"
                    },
                    {
                    title: "Quero Ficar Com Polly",
                    imageUrl: "img/comediaromantica/queroficarcompolly.webp",
                    url: "categorias/comedia_romantica/page3.html#quero-ficar-com-polly"
                    },
                    {
                    title: "Como se Fosse a Primeira Vez",
                    imageUrl: "img/comediaromantica/comosefosseaprimeiravez.jpg",
                    url: "categorias/comedia_romantica/page3.html#como-se-fosse-a-primeira-vez"
                    },
                    {
                    title: "Um Lugar Chamado Notting Hill",
                    imageUrl: "img/comediaromantica/umlugarchamadonottinghill.webp",
                    url: "categorias/comedia_romantica/page3.html#um-lugar-chamado-notting-hill"
                    },
                    {
                    title: "Noiva em Fuga",
                    imageUrl: "img/comediaromantica/noivaemfuga.webp",
                    url: "categorias/comedia_romantica/page3.html#noiva-em-fuga"
                    },
                    {
                    title: "Ingresso Para o Paraíso",
                    imageUrl: "img/comediaromantica/ingressoparaoparaiso.jpg",
                    url: "categorias/comedia_romantica/page3.html#ingresso-para-o-paraiso"
                    },
                    {
                    title: "Comer, Rezar, Amar",
                    imageUrl: "img/comediaromantica/comer,rezar,amar.webp",
                    url: "categorias/comedia_romantica/page3.html#comer-rezar-amar"
                    },
                    {
                    title: "Enquanto Você Dormia",
                    imageUrl: "img/comediaromantica/enquantovocedormi.webp",
                    url: "categorias/comedia_romantica/page3.html#enquanto-voce-dormia"
                    },
                    {
                    title: "Amor à Segunda Vista",
                    imageUrl: "img/comediaromantica/amorasegundavista.jpg",
                    url: "categorias/comedia_romantica/page3.html#amor-a-segunda-vista"
                    },
                    {
                    title: "Todos Menos Você",
                    imageUrl: "img/comediaromantica/todosmenosvoce.jpg",
                    url: "categorias/comedia_romantica/page4.html#todos-menos-voce"
                    },
                    {
                    title: "Amor a Toda Prova",
                    imageUrl: "img/comediaromantica/amoratodaprova.jfif",
                    url: "categorias/comedia_romantica/page4.html#amor-a-toda-prova"
                    },
                    {
                    title: "O Diário de Bridget Jones",
                    imageUrl: "img/comediaromantica/odiariodebridgetjones.webp",
                    url: "categorias/comedia_romantica/page4.html#o-diario-de-bridget-jones"
                    },
                    {
                    title: "(500) Dias com Ela",
                    imageUrl: "img/comediaromantica/500diascomela.webp",
                    url: "categorias/comedia_romantica/page4.html#500-dias-com-ela"
                    },
                    {
                    title: "Casal Improvável",
                    imageUrl: "img/comediaromantica/casalimprovavel.jpg",
                    url: "categorias/comedia_romantica/page4.html#casal-improvavel"
                    },
                    {
                    title: "A Mentira",
                    imageUrl: "img/comediaromantica/amentira.webp",
                    url: "categorias/comedia_romantica/page4.html#a-mentira"
                    },
                    {
                    title: "S.O.S do Amor",
                    imageUrl: "img/comediaromantica/sosdoamor.webp",
                    url: "categorias/comedia_romantica/page4.html#sos-do-amor"
                    },
                    {
                    title: "Encontro de Casais",
                    imageUrl: "img/comediaromantica/encontrodecasais.webp",
                    url: "categorias/comedia_romantica/page4.html#encontro-de-casais"
                    },
                    {
                    title: "Ela e os Caras",
                    imageUrl: "img/comediaromantica/elaeoscaras.webp",
                    url: "categorias/comedia_romantica/page4.html#ela-e-os-caras"
                    },
                    {
                    title: "Amizade Colorida",
                    imageUrl: "img/comediaromantica/amizadecolorida.jpg",
                    url: "categorias/comedia_romantica/page4.html#amizade-colorida"
                    },
                    {
                    title: "O Amor é Cego",
                    imageUrl: "img/comediaromantica/oamorécego.jpg",
                    url: "categorias/comedia_romantica/page5.html#o-amor-e-cego"
                    },
                    {
                    title: "Amor com Data Marcada",
                    imageUrl: "img/comediaromantica/amorcomdatamarcada.webp",
                    url: "categorias/comedia_romantica/page5.html#amor-com-data-marcada"
                    },
                    {
                    title: "A Sogra",
                    imageUrl: "img/comediaromantica/asogra.webp",
                    url: "categorias/comedia_romantica/page5.html#a-sogra"
                    },
                    {
                    title: "Juntos pelo Acaso",
                    imageUrl: "img/comediaromantica/juntospeloacaso.webp",
                    url: "categorias/comedia_romantica/page5.html#juntos-pelo-acaso"
                    },
                    {
                    title: "Coincidências do Amor",
                    imageUrl: "img/comediaromantica/coincidenciasdoamor.webp",
                    url: "categorias/comedia_romantica/page5.html#coincidencias-do-amor"
                    },
                    {
                    title: "Plano B",
                    imageUrl: "img/comediaromantica/planob.jpg",
                    url: "categorias/comedia_romantica/page5.html#plano-b"
                    },
                    {
                    title: "Eu Queria Ter a Sua Vida",
                    imageUrl: "img/comediaromantica/euqueriaterasuavida.jpg",
                    url: "categorias/comedia_romantica/page5.html#eu-queria-ter-a-sua-vida"
                    },
                    {
                    title: "O Amor Acontece",
                    imageUrl: "img/comediaromantica/oamoracontece.webp",
                    url: "categorias/comedia_romantica/page5.html#o-amor-acontece"
                    },
                    {
                    title: "Uma Comédia Nada Romântica",
                    imageUrl: "img/comediaromantica/umacomedianadaromantica.webp",
                    url: "categorias/comedia_romantica/page5.html#uma-comedia-nada-romantica"
                    },
                    {
                    title: "Separados pelo Casamento",
                    imageUrl: "img/comediaromantica/separados pelo casamento.webp",
                    url: "categorias/comedia_romantica/page5.html#separados-pelo-casamento"
                    }
            
            // Adicione mais filmes aqui, se necessário
        ];

        // Referência para a coleção "filmes"
        const moviesCollection = collection(db, "filmes");

        // Adiciona cada filme à coleção
        for (const movie of movies) {
            await addDoc(moviesCollection, movie);
            console.log(`Filme ${movie.title} adicionado com sucesso!`);
        }
    } catch (error) {
        console.error("Erro ao adicionar filmes: ", error);
    }
}

// Chama a função para adicionar os filmes
addMovies();
