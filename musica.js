let musica = document.querySelector("audio");

let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let duracaoMusica = document.querySelector(".fimMusica");
let indexMusica = 0;
let aux = 0

//eventos
document.querySelector(".botao-play").addEventListener('click',tocarMusica);

document.querySelector(".botao-pause").addEventListener('click',pausarMusica);

musica.addEventListener('loadeddata', atualizarBarra);

musica.addEventListener('loadeddata', duration)

musica.addEventListener('loadeddata', renderizarMusica(indexMusica));

document.querySelector('.anterior').addEventListener('click', () => {
    aux = 1
    indexMusica--
    if(indexMusica < 0){
        indexMusica = (dados.length) - 1
    }
    renderizarMusica(indexMusica);
});
document.querySelector('.proxima').addEventListener('click', () => {
    aux = 1
    indexMusica++
    if(indexMusica > (dados.length - 1)){
       indexMusica = 0;
    }
    renderizarMusica(indexMusica);
   
});

let barra = document.querySelector('.barra');
let valorBarra;
let valorPular;
const multiplicador = 100;
barra.oninput = function(){
    valorBarra = this.value
    //console.log(valorBarra);
    valorPular = (valorBarra * musica.duration) / 100
    //console.log(valorPular)
    musica.currentTime = valorPular  
}
//funcoes
function renderizarMusica(index){
    musica.setAttribute('src', dados[index].musica);
    aux === 1 ? tocarMusica() : " ";
    
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = dados[index].nomeMusica;
        nomeArtista.textContent = dados[index].cantorMusica;
        imagem.src = dados[index].imgMusica;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
    });
}
function tocarMusica(){
    musica.play()
    document.querySelector('.botao-pause').style.display = 'block'
    document.querySelector('.botao-play').style.display = 'none'

    
}
function pausarMusica(){
    musica.pause()
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
}

function atualizarBarra(){
    musica.addEventListener('timeupdate', () => {
        let barra = document.querySelector('.barra');
        barra.value = Math.floor((musica.currentTime / musica.duration) * 100);
        //console.log(barra.value)
        //console.log(musica.duration)
        let tempoDecorrido = document.querySelector('.inicioMusica');
        tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));

    })
    
}


function segundosParaMinutos(segundos){
    let campoMinuto = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60
    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos
    }
    return campoMinuto + ":" + campoSegundos
}
function duration(){
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))  
    
}



