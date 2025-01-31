
/*Em javascript, DOM significa Document Object Model (Modelo de Objeto
de Documento). Ele é uma interface que permite que o javascript interaja
com o conteúdo de páginas web. */

/*Imagine o  Dom como uma arvore:

A raiz da arvore: O documento HTML em si

Os galhos: Os elementos HTML (como paragráfos, imagens, titulos, etc)

As folhas: O texto dentro dos elementos.
*/

/*O DOM representa essa estrutura de forma que o JavaScript possa acessar e modificar cada parte dela.  */


/*Seleciona o elemenyto HTML com o id search-input  e armazena
o valor na variável searchInput */
const searchInput = document.getElementById('search-input');

/*Seleciona o elemento HTML com o id result-artist (onde os resultados
da busca de artistas serão exibidos) e armazena na variável resultArtist. */
const resultsArtist = document.getElementById('result-artist');

/*Seleciona o elemento HTML com o id result-playlists (para exibir as playlists relacionadas) e armazen na variável resultplaylist. */
const resultPlaylist = document.getElementById('result-playlists')

/*Eventos: interações com o usuário ou funcionalidades da página ,
basicamente são ações que o sistema realiza.*/

/*API: Em programação, API significa interface de programação de Aplicativos. É um conjunto de regras e protocolos que permitem que
diferentes aplicativos de software se comuniquem e troquem dados
entre si. Imagine uma api como um garçom em um restaurante. O
cliente (aplicativo) faz um pedido (solicitação) através do
garçom(api) para a cozinha(outro aplicativo). O garçom então
traz o pedido(dados) de volta para o cliente.*/


/*Define uma função chamada requestApi que recebe como parametro
um termo de busca. */
function requestApi(searchTerm){

    /*Armazena a url da API usando como parametro o termo de busca. */
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`

    /*Faz uma requisição (pedido / solicitação) para a url da API usando
    o método fetch */
    fetch(url)

        /*Quando a resposta da API chega, essa parte do código converte
        a resposta para o formarto JSON. */
        .then((response) => response.json())
        /*Em seguida, chama a função displayResults para processar e exibir os resultados da API. */
        .then((result) => displayResults(result))

}

/*Define uma função chamada displayResults que recebe os resultados da
API(result) como argumento. */
function displayResults(result){

    /*Oculta o elemento resultPlaylist (talvez porque não seja relevante
    para a busca de artista). */
    resultPlaylist.classList.add('hidden');

    /*Selecionam os elementos HTML onde o nome e a imagem do artista serão exibidos */
    const artistName = document.getElementById('artist-name');

    const artistImage = document.getElementById('artist-img');

    /*Itera sobre cada item(artista) dentro do array result. */
    result.forEach(element => {
        
        /*Define o texto dentro do elemento artistName com o nome
        do artista */
        artistName.innerText = element.name;

        /*Define o atributo src do elemento artistImage com a URL da
        imagem do artista. */
        artistImage.src = element.urlImg;
    });

    /*Exibe o elemento resultArtist (onde os resultados de busca de
    artistas são exibidos). */
    resultsArtist.classList.remove('hidden');

    console.log(result);
}



/*Adiciona um ouvinte de eventos para o evento input no documento. O
evento input é acionado sempre que o usuário digita algo no campo de busca */
document.addEventListener('input', function() {

    /*Obtém o valor atual do campo de busca, converte para letras
    minusculas e armazena na variável searchTerm */
    const searchTerm = searchInput.value.toLowerCase();

    /*Verifica se o campo de busca está vázio. Se estiver, oculta o elemento resultPlaylist, exibe o elemento resultArtist e sai da função */
    if(searchTerm === '' ){

        resultPlaylist.classList.add('hidden');
        
        resultsArtist.classList.remove('hidden');
 
        return;

    }

    /*Se o campo de busca não estiver vázio, chama a função requestApi com o termo de busca atual. */
    requestApi(searchTerm);
})
