document.body.onload = (e) => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    const menorLado = Math.min(width, height);

    const tamanhoDoTabuleiro = menorLado - 50;
    document.documentElement.style.setProperty("--tamanho-do-tabuleiro", tamanhoDoTabuleiro);
}

const codigoNomeDasPecas = {
    re: "Rei",
    ra: "Rainha",
    b: "Bispo",
    c: "Cavalo",
    t: "Torre",
    p: "Peão"
};

const codigoCorDasPecas = {
    p: "primeira-cor",
    s: "segunda-cor"
};

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

    const {row, column} = coordenadas;
    if ((row + column) % 2 == 0) casaDoTabuleiro.classList.add("primeira-cor-padrao");
    else casaDoTabuleiro.classList.add("segunda-cor-padrao");

    return casaDoTabuleiro;
} 

criarTabuleiro();
