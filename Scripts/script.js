const mario = document.getElementById("mario")
const cano = document.getElementById("cano")
const jogo = document.getElementById("jogo")
const nuvem = document.getElementById('nuvem')
const divfinal = document.getElementById('final')
const grama = document.getElementById('grama')

const placarElemento = document.getElementById('placar');
const somPulo = document.getElementById('somPulo');
const somDerrota = document.getElementById('somDerrota');

let celular = false
let jogoiniciar = false
let recomecar = false
let pulando = false
let spriteOriginal = 'images/correndo.gif';

let pontuacao = 0;
let loopPontuacao;
let velocidadeCano = 3.0;

mario.style.display = 'none'
cano.style.display = 'none'
jogo.style.display = 'none'
cano.style.animation = 'none'

const btn1p = document.getElementById('iniciar')
const telainicial = document.getElementById('inicio')

const btnComoJogar = document.getElementById('como-jogar');
const btnFecharModal = document.getElementById('fechar-modal');
const modal = document.getElementById('modal-como-jogar');

btnComoJogar.addEventListener('click', () => {
    modal.style.display = 'flex';
});

btnFecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal-como-jogar') {
        modal.style.display = 'none';
    }
});

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const pokemonImageUrl = getQueryParameter('image');
if (pokemonImageUrl) {
    mario.src = pokemonImageUrl;
    spriteOriginal = pokemonImageUrl;
}


btn1p.addEventListener('click', ()=>{
    jogoiniciar = true
    btn1p.style.display = 'none'
    btnComoJogar.style.display = 'none';
    telainicial.style.display = 'none'
    
    if(jogoiniciar === true){
        mario.style.display = 'flex'
        cano.style.display = 'flex'
        jogo.style.display = 'flex'

        velocidadeCano = 3.0;
        let velocidadeInicial = velocidadeCano + 's';
        cano.style.animation = 'animacaocano ' + velocidadeInicial + ' infinite linear';

        pontuacao = 0;
        placarElemento.innerText = 'PONTOS: 0';
        loopPontuacao = setInterval(() => {
            pontuacao++;
            placarElemento.innerText = `PONTOS: ${pontuacao}`;
            
            if (pontuacao % 100 === 0 && velocidadeCano > 1.0) {
                velocidadeCano -= 0.1;
                let novaVelocidade = velocidadeCano.toFixed(1) + 's';
                cano.style.animationDuration = novaVelocidade;
            }
        }, 100);

        function detectar_mobile() { 
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
            return celular = true;
            }
            else {
            return celular = false;
            }
        }
        detectar_mobile();
    }
})


const loop = setInterval(()=>{
    const canoposition = cano.offsetLeft;
    const nuvemposition = nuvem.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace("px", "")
    
    if(canoposition <= 70 && canoposition >= 50 && marioposition < 80){
        cano.style.animation = "none"
        cano.style.left = `${canoposition}px`
        
        nuvem.style.animation = 'none'
        nuvem.style.left = `${nuvemposition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioposition}px`
        
        somDerrota.play();
        recomecar = true
        clearInterval(loop)
        clearInterval(loopPontuacao)
    }
},10)

function pular() {
    if (!pulando && jogoiniciar) {
        somPulo.currentTime = 0;
        somPulo.play();
        pulando = true;
        mario.classList.add('pulo');

        setTimeout(() => {
            mario.classList.remove('pulo');
            pulando = false;
        }, 600);
    }
}

if(celular === true){
    document.addEventListener("click", pular);
}else{
    document.addEventListener("keydown", (e)=>{
        if(e.code === 'Space'){
            pular();
        }
    })
}

const recomeco = setInterval(()=>{
    if(recomecar === true){
        mario.style.display = 'none'
        cano.style.display = 'none'
        jogo.style.display = 'none'
        cano.style.animation = 'none'
        telainicial.style.display = 'none'
        btn1p.style.display = 'none'
        jogoiniciar = false
        
        if(loopPontuacao) clearInterval(loopPontuacao);

        const final = document.createElement('div')
        final.id = 'morreu'
        divfinal.appendChild(final)
        
        const imagem1 = document.createElement('img')
        const imagem2 = document.createElement('img')
        imagem1.id = 'bowser1'
        imagem2.id = 'bowser2'
        imagem1.src = 'Images/bowser1.png'
        imagem2.src = 'Images/bowser2.png'
        final.appendChild(imagem1)
        final.appendChild(imagem2)
        
        const a = document.createElement('a')
        a.href = 'index.html'
        a.innerText = 'Recomeçar Jogo'
        final.appendChild(a)
        
        clearInterval(recomeco)
    }
}, 10)

const selecionar = document.createElement('a')
telainicial.appendChild(selecionar)
selecionar.id = 'selecionar'
selecionar.innerText = 'Selecione seu personagem!'
selecionar.href = 'selecione.html'