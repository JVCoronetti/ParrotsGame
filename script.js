let containerCartas = document.querySelector(".container-cartas");
let totalCartas;
let cartasViradas = 0;
let jogadaAtual = 0;
let primeiraCarta = null;
let segundaCarta = null;
let contadorJogadas = 0;
let cartasEncontradas = 0;

const imagens = [
    "assets/bobrossparrot.gif",
    "assets/explodyparrot.gif",
    "assets/fiestaparrot.gif",
    "assets/metalparrot.gif",
    "assets/unicornparrot.gif",
    "assets/revertitparrot.gif",
    "assets/tripletsparrot.gif"
];
const imgVerso = "assets/back.png";
let cartasJogo = [];


function configurarImagens() {
    cartasJogo = [];
    let quantidadeCartas = totalCartas / 2;
    for (let i = 0; i < quantidadeCartas; i++) {
        cartasJogo.push(imagens[i]);
        cartasJogo.push(imagens[i]);
    }
    cartasJogo.sort(() => Math.random() - 0.5);
}


function criarTabuleiro() {
    containerCartas.innerHTML = ''; 
    for (let i = 0; i < totalCartas; i++) {
        containerCartas.innerHTML += `
            <div class="carta" onclick="virarCarta(this)">
                <div class="lado lado-frente">
                     <img src=${imgVerso} alt="Verso da carta">
                </div>
                <div class="lado lado-verso">
                    <img src=${cartasJogo[i]} alt="Frente da carta">
                </div>
            </div>`;
    }
}


function iniciarJogo() {
    while (true) {
        totalCartas = Number(prompt("Com quantas cartas deseja jogar? Escolha um número par entre 4 e 14."));
        if (totalCartas >= 4 && totalCartas <= 14 && totalCartas % 2 === 0) {
            break;
        } else {
            alert("Número inválido! Escolha um número par entre 4 e 14.");
        }
    }
    configurarImagens();
    criarTabuleiro();
    resetarEstadoJogo();
}


function resetarEstadoJogo() {
    cartasViradas = 0;
    jogadaAtual = 0;
    primeiraCarta = null;
    segundaCarta = null;
    contadorJogadas = 0;
    cartasEncontradas = 0;
}


function virarCarta(carta) {
    if (carta.classList.contains("selecionada") || carta.classList.contains("fixada") || jogadaAtual === 2) {
        return; 
    }

    carta.classList.add("selecionada");
    jogadaAtual++;

    contadorJogadas++; 

    if (jogadaAtual === 1) {
        primeiraCarta = carta;
    } else if (jogadaAtual === 2) {
        segundaCarta = carta;
        setTimeout(checarPar, 1000); 
    }
}


function checarPar() {
    let carta1Img = primeiraCarta.querySelector(".lado-verso img").src;
    let carta2Img = segundaCarta.querySelector(".lado-verso img").src;

    if (carta1Img === carta2Img) {
        
        primeiraCarta.classList.add("fixada");
        segundaCarta.classList.add("fixada");
        cartasEncontradas += 2;
        verificarFimDeJogo();
    } else {
    
        primeiraCarta.classList.remove("selecionada");
        segundaCarta.classList.remove("selecionada");
    }

    
    jogadaAtual = 0;
    primeiraCarta = null;
    segundaCarta = null;
}


function verificarFimDeJogo() {
    if (cartasEncontradas === totalCartas) {
        setTimeout(() => alert(`Parabéns! Você venceu em ${contadorJogadas} jogadas.`), 500);
    }
}



iniciarJogo();
