const containerVideos = document.querySelector('.videos__container')
const barraDePesquisa = document.querySelector('.pesquisar__input')
const btnCategoria = document.querySelectorAll('.superior__item')

async function buscarMostrarVideos(){
    try{
        const busca = await fetch("https://mpfceff5abe89a89205f.free.beeceptor.com/videos")
        const videos = await busca.json()

            videos.forEach((videos) => {
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${videos.url}" title="${videos.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${videos.imagem}" alt="logo do canal">
                        <h3 class="titulo-video">${videos.titulo}</h3>
                        <p class="titulo-canal">${videos.descricao}</p>
                        <p class="categoria" hidden>${videos.categoria}</p>
                    </div>

                </li>
                `
        })
} catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
} 
}

buscarMostrarVideos()

barraDePesquisa.addEventListener('input', filtrarPesquisa)

function filtrarPesquisa() {
    const videosExibidos = document.querySelectorAll('.videos__item')   
    const valorFiltro = barraDePesquisa.value.toLowerCase()

    videosExibidos.forEach((videos) => {
        const titulo = videos.querySelector('.titulo-video').textContent.toLowerCase();
    
        videos.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
      });
}

btnCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name')
    console.log(botao)
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria))
})


function filtrarPorCategoria(filtro){
    const videosCategoria = document.querySelectorAll('.videos__item')

    for (let videos of videosCategoria){
        let categoria = videos.querySelector('.categoria').textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()

        if(!categoria.includes(valorFiltro) && valorFiltro != 'Tudo') {
            videos.style.display = 'none'
        } else {
            videos.style.display = 'block'
        }
    }
}
