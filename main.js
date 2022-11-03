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
    coordenadasDaPecaAtiva: {rowAtiva: null, columnAtiva: null},
};

function criarTabuleiro() {
    const tabuleiro = document.querySelector(".tabuleiro");

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const coordenadas = {row, column};
            const casaDoTabuleiro = criarCasaDoTabuleiro(coordenadas);

            tabuleiro.appendChild(casaDoTabuleiro);
        }
    }

    criarPecasNoTabuleiro();
}

function criarCasaDoTabuleiro(coordenadas) {
    const casa = document.createElement("div");
    casa.classList.add("casa");

    const {row, column} = coordenadas;
    if ((row + column) % 2 == 0) casa.classList.add("bg-primeira");
    else casa.classList.add("bg-segunda");

    casa.id = `casa-${row}-${column}`;

    //! usarei letras inicialmente, mas pretendo excluir esse bloco futuramente.
    const text = document.createElement("p");
    text.classList.add("text");
    casa.appendChild(text);

    casa.addEventListener("click", () => decidirAcaoDaCasa(casa));

    return casa;
} 

function criarPecasNoTabuleiro() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const informacoesDaCasa = informacoesDasCasas[row][column];
            const {nomeDaPeca, corDaPeca} = informacoesDaCasa;

            const text = document.querySelector(`#casa-${row}-${column} .text`);
            text.textContent = nomeDaPeca;
            text.className = "text";
            text.classList.add(`color-${corDaPeca}`);
        }
    }
}

function decidirAcaoDaCasa(casa) {
    const [, rowDaCasa, columnDaCasa] = casa.id.split("-");
    const informacoesDaCasa =  informacoesDasCasas[rowDaCasa][columnDaCasa];

    const corDaCasa = informacoesDaCasa.corDaPeca;
    const corDaVez = informacoesDoJogo.corDaVez;

    //! veja primeiro se na casa clicada existe ou não uma peça (se uma peça ja estava ativa)
    //! depois se a cor é da vez
    //! depois se as cores sao iguais
    const isACorDavez = corDaVez === corDaCasa;
    if (isACorDavez) {
        const {rowAtiva, columnAtiva} = informacoesDoJogo.coordenadasDaPecaAtiva;
        if ((rowAtiva === rowDaCasa) && (columnAtiva === columnDaCasa)) limparInformacoesDoJogo();
        else {
            limparInformacoesDoJogo();

            casa.classList.add("casa-ativa");
            informacoesDoJogo.coordenadasDaPecaAtiva = {
                rowAtiva: rowDaCasa,
                columnAtiva: columnDaCasa
            };

            //! escolha um nome melhor kk eu acho kk
            decidirOsMovimentosDaPeca(informacoesDaCasa);

            // informacoesDoJogo.corDaVez = corDaCasa === "primeira-cor" ? "segunda-cor" : "primeira-cor";
        }
    } else {
        limparInformacoesDoJogo();
    }
}

//! criar funções para para cada if e else nas funçoes, só aceitando 1 nivel de if else por funcao.

function decidirOsMovimentosDaPeca(informacoesDaCasa) {
    const {nomeDaPeca} = informacoesDaCasa;

    //! pense em criar um array chamado informacoes das pecas, que só conste informaçoes sobre cada peça e mais nada.
    //! essas informacoes em uni dimensional, otimizaram o uso de fors, apesar que sei la, qual deve ser o mais didaytico
    switch (nomeDaPeca) {
        case "peão":
            //? aqui encaminha para uma funcao que mostra os possíveis caminhos do peao
            break;
    }
}

function limparInformacoesDoJogo() {
    informacoesDoJogo.coordenadasDaPecaAtiva = {
        rowAtiva: null,
        columnAtiva: null
    };

    const casasDoTabuleiro = document.querySelectorAll(".casa");
    casasDoTabuleiro.forEach(casa => {
        casa.classList.remove("casa-ativa");
    });
}

criarTabuleiro();
