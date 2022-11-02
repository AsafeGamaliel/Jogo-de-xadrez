function criarTabuleiro() {
    const tabuleiro = document.querySelector(".tabuleiro");

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const casaDoTabuleiro = criarCasaDoTabuleiro({row, column});

            tabuleiro.appendChild(casaDoTabuleiro);
        }
    }
}

function criarCasaDoTabuleiro(coordenadas) {
    const casaDoTabuleiro = document.createElement("div");
    casaDoTabuleiro.classList.add("casa-do-tabuleiro");

    return casaDoTabuleiro;
} 

criarTabuleiro();
