// ======================================================
// FIREBASE
// ======================================================

import { auth } from "../login/firebase.js";

import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase();

// ======================================================
// VERIFICA LOGIN
// ======================================================

auth.onAuthStateChanged(async (user) => {

  if (!user) {

    window.location.href = "../login/login.html";
    return;

  }

  const uid = user.uid;

  try {

    const snapshot = await get(ref(db, "usuarios/" + uid));

    if (snapshot.exists()) {

      const dados = snapshot.val();

      document.getElementById("nomeUsuario").innerText =
        dados.nome || "Usuário";

      document.getElementById("tipoUsuario").innerText =
        "Nível: " + (dados.tipo || "Operador");

    }

  } catch (erro) {

    console.error("Erro ao buscar dados:", erro);

  }

});
