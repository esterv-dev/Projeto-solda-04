// ELEMENTOS
const btnMenu = document.getElementById("btnMenu");

const ladoDireito = document.getElementById("statusMaquina");

const layout = document.querySelector(".layout");

btnMenu.addEventListener("click", () => {

  ladoDireito.classList.toggle("status-fechado");

  layout.classList.toggle("layout-expandido");

});

// ======================================================
// DATA E HORA
// ======================================================

function atualizarDataHora() {

  const agora = new Date();

  const data = agora.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const hora = agora.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const dataEl = document.getElementById("dataAtual");
  const horaEl = document.getElementById("horaAtual");

  if (dataEl) dataEl.innerText = data;
  if (horaEl) horaEl.innerText = hora;

}

// roda imediatamente
atualizarDataHora();

// atualiza continuamente
setInterval(atualizarDataHora, 1000);