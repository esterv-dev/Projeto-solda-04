import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const btnCadastrar =
  document.getElementById("btnCadastrar");

btnCadastrar.addEventListener("click", async () => {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    );

    alert("Conta criada!");

    window.location.href = "login.html";

  } catch (error) {

    console.log(error);

    alert("Erro ao criar conta");

  }

});