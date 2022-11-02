function criarTabuleiro() {
    const tabuleiro = document.querySelector(".tabuleiro");

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const casaDoTabuleiro = document.createElement("div");

            tabuleiro.appendChild(casaDoTabuleiro);
        }
    }
}

criarTabuleiro();
