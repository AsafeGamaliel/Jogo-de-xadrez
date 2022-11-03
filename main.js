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

const codigoNumeroDasPecas = {
    re: {p: 0, s: 0},
    ra: {p: 0, s: 0},
    b: {p: 0, s: 0},
    c: {p: 0, s: 0},
    t: {p: 0, s: 0},
    p: {p: 0, s: 0}
};

const codigoNoTabuleiro = [
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "re-p","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""]
];

const representacaoDoTabuleiro = Array(8).fill("").map((v, i1) => {
    return Array(8).fill("").map((v, i2) => {
        const infomacaoDaCasa = {
            nome: null, 
            cor: null, 
            numero: null, 
            coordenadas: {row: i1, column: i2}
        }; 

        const codigosDaPeca = codigoNoTabuleiro[i1][i2];
        if (codigosDaPeca.length) {
            const [nome, cor] = codigosDaPeca.split("-");

            infomacaoDaCasa.nome = codigoNomeDasPecas[nome];
            infomacaoDaCasa.cor = codigoCorDasPecas[cor];
            infomacaoDaCasa.numero = ++codigoNumeroDasPecas[nome][cor];
        }

        return infomacaoDaCasa;
    });
});

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
