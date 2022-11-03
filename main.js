document.body.onload = () => {
    const larguraDaTela = document.body.clientWidth;
    const alturaDaTela = document.body.clientHeight;
    const menorLadoDaTela = Math.min(larguraDaTela, alturaDaTela);
    const tamanhoDoLadoDoTabuleiro = menorLadoDaTela - 50;

    const tabuleiro = document.querySelector(".tabuleiro");
    tabuleiro.style.width = tamanhoDoLadoDoTabuleiro + "px";
    tabuleiro.style.height = tamanhoDoLadoDoTabuleiro + "px";
}

const codigosDosNomesDasPecas = {
    re: "rei",
    ra: "rainha",
    b: "bispo",
    c: "cavalo",
    t: "torre",
    p: "peão",
    n: null
};

const codigosDasCoresDasPecas = {
    p: "primeira",
    s: "segunda",
    n: null
};

const codigosDosNumerosDasPecas = {
    re: {p: 0, s: 0},
    ra: {p: 0, s: 0},
    b: {p: 0, s: 0},
    c: {p: 0, s: 0},
    t: {p: 0, s: 0},
    p: {p: 0, s: 0},
    n: {n: 0}
};

const codigosNoTabuleiro = [
    ["", "", "", "","", "", "", ""],
    ["", "", "", "p-p","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "", "", ""],
    ["", "", "", "","", "p-s", "", ""],
    ["", "", "", "","", "", "", ""]
].map(v1 => v1.map(v2 => v2.length ? v2 : "n-n"));

const informacoesDasCasas = Array(8).fill("").map((v, i1) => {
    return Array(8).fill("").map((v, i2) => {
        const codigosDaPeca = codigosNoTabuleiro[i1][i2];
        const [codigoDoNome, codigoDaCor] = codigosDaPeca.split("-");

        const informacoesDaCasa = {
            nomeDaPeca: codigosDosNomesDasPecas[codigoDoNome], 
            corDaPeca: codigosDasCoresDasPecas[codigoDaCor], 
            numeroDaPeca: ++codigosDosNumerosDasPecas[codigoDoNome][codigoDaCor], 
            coordenadasDaCasa: {row: i1, column: i2}
        }; 

        return informacoesDaCasa;
    });
});

const informacoesDoJogo = {
    corDaVez: "primeira",
    coordenadasDaPecaAtiva: {row: null, column: null},
};

function criarTabuleiro() {
    const tabuleiro = document.querySelector(".tabuleiro");

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const coordenadas = {row, column};
            const casa = criarCasa(coordenadas);

            tabuleiro.appendChild(casa);
        }
    }

    criarTodasPecas();
}

function criarCasa(coordenadas) {
    const {row, column} = coordenadas;

    const casa = document.createElement("div");

    casa.classList.add("casa", (row + column) % 2 == 0 ? "bg-primeira" : "bg-segunda");
    casa.id = `casa-${row}-${column}`;
    casa.addEventListener("click", () => decidirAcaoDaCasa(coordenadas));

    return casa;
} 

function criarTodasPecas() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const coordenadas = {row, column};
            const casa = document.querySelector(`#casa-${row}-${column}`);
            const peca = criarPeca(coordenadas);

            casa.appendChild(peca);
        }
    }
}

function criarPeca(coordenadas) {
    const {row, column} = coordenadas;
    const informacoesDaCasa = informacoesDasCasas[row][column];
    const {nomeDaPeca, corDaPeca} = informacoesDaCasa;

    //! pretendo mudar isso para imagens em SVG
    const peca = document.createElement("p");
    peca.classList.add("text", `color-${corDaPeca}`);
    peca.textContent = nomeDaPeca;

    return peca;
}

function decidirAcaoDaCasa(coordenadas) {
    const isACorDavez = retornarSeIsACorDaVez(coordenadas);
    if (isACorDavez) {
        decidirSeAtivaAPeca(coordenadas);
    } else {
        limparInformacoesDoJogo();
    }
}

function retornarSeIsACorDaVez(coordenadas) {
    const {row, column} = coordenadas;
    const informacoesDaCasa =  informacoesDasCasas[row][column];

    const { corDaPeca } = informacoesDaCasa;
    const { corDaVez } = informacoesDoJogo;

    return (corDaVez === corDaPeca);
}

function decidirSeAtivaAPeca(coordenadas) {
    const {row, column} = coordenadas;
    const {row : rowAtiva, column : columnAtiva} = informacoesDoJogo.coordenadasDaPecaAtiva;

    if ((rowAtiva === row) && (columnAtiva === column)) {
        limparInformacoesDoJogo();
    } else {
        limparInformacoesDoJogo();

        informacoesDoJogo.coordenadasDaPecaAtiva = { row, column };

        const casa = document.querySelector(`#casa-${row}-${column}`);
        casa.classList.add("casa-ativa");

        procurarOsMovimentosDaPeca();
    }
}

function procurarOsMovimentosDaPeca() {
    const {row, column} = informacoesDoJogo.coordenadasDaPecaAtiva;
    const {nomeDaPeca} = informacoesDasCasas[row][column];

    switch (nomeDaPeca) {
        case "peão":
            console.log("Apertou no peão");
            //? aqui encaminha para uma funcao que mostra os possíveis caminhos do peao
            break;
    }
}

function limparInformacoesDoJogo() {
    informacoesDoJogo.coordenadasDaPecaAtiva = {row: null, column: null};

    const casas = document.querySelectorAll(".casa");
    casas.forEach(casa => {
        casa.classList.remove("casa-ativa");
    });
}

criarTabuleiro();
