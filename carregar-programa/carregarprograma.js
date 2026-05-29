
const lista = document.getElementById("lista");

/* ================================
CARREGAR PROGRAMAS
================================ */

function carregarProgramas(){

    lista.innerHTML = "";

    for(let i = 0; i < localStorage.length; i++){

        const chave = localStorage.key(i);

        const programa = JSON.parse(
            localStorage.getItem(chave)
        );

        if(!programa.pontos) continue;

        const card = document.createElement("div");
        card.className = "programa";

        card.innerHTML = `
            <div class="nome">${programa.nome}</div>
            <div class="data">${programa.data}</div>
            <div class="pontos">${programa.pontos.length} pontos salvos</div>

            <button onclick="abrirPrograma('${chave}')">
                CARREGAR
            </button>
        `;

        lista.appendChild(card);
    }
}

/* ================================
ABRIR PROGRAMA
================================ */

function abrirPrograma(nome){

    localStorage.setItem(
        "programaAtual",
        nome
    );

    window.location.href =
    "../new-program/novoprograma.html";
}

carregarProgramas();

