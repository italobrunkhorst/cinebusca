import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db } from './inicializador-firebase.js'; 

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            window.location.href = "../index.html";

            alert("login bem-sucedido!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        }
    });
});
