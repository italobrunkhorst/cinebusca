import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

            if (!user.emailVerified) {
                alert("Seu e-mail ainda não foi verificado. Verifique sua caixa de entrada para confirmar.");
                return;
            }

            window.location.href = "../index.html";

            alert("login bem-sucedido!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleSenha = document.getElementById("toggle-senha");
    const senhaInput = document.getElementById("senha");

    function toggleVisibility(inputField, toggleIcon) {
        if (inputField.type === "password") {
            inputField.type = "text";
            toggleIcon.textContent = "visibility_off";
        } else {
            inputField.type = "password";
            toggleIcon.textContent = "visibility";
        }
    }

    toggleSenha.addEventListener("click", () => toggleVisibility(senhaInput, toggleSenha));
});

const auth= getAuth();
const forgotPasswordLink = document.getElementById("forgot-password");
const emailInput = document.getElementById("email");

forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        alert("Por Favor, insira seu e-mail antes de clicar em 'Esqueci a senha!'");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert(`Um e-mail de redefinição de senha foi enviado para ${email}. Verifique sua caixa de entrada.`);
        })
        .catch((error) => {
            console.error("Erro ao enviar email de redefinição de senha:", error);
            if (error.code === "auth/invalid-email") {
                alert("O email inserido é inválido.");
            } else if (error.code === "auth/user-not-found") {
                alert("Nenhuma conta encontrada com este email.");
            } else {
                alert("Ocorreu um erro ao tentar enviar o email. Tente novamente mais tarde.");
            }
        });
});