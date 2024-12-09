import { db } from './inicializador-firebase.js'; // Importando a instância do Firebase
import { collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirma-senha").value;

    const errorMessages = {
        "auth/email-already-in-use": "Este e-mail já está sendo usado. Por favor, utilize outro e-mail.",
        "auth/invalid-email": "O endereço de e-mail fornecido é inválido.",
        "auth/weak-password": "A senha é muito fraca. Utilize pelo menos 6 caracteres.",
        "auth/user-not-found": "Usuário não encontrado. Verifique o e-mail digitado.",
        "auth/wrong-password": "Senha incorreta. Tente novamente.",
        "auth/too-many-requests": "Muitas tentativas falhas. Por favor, tente novamente mais tarde.",
        // Outros códigos de erro...
    };

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert("Cadastro realizado com sucesso! Um e-mail de verificação foi enviado para " + email);

        await updateProfile(user, {
            displayName: name
        });

        await setDoc(doc(db, "usuarios", user.uid), {
            nome: name,
            email: email
        });

        await addDoc(collection(db, "usuarios"),{
            uid: user.uid,
            nome: name,
            email: email
        });
        document.getElementById("register-form").reset();
        window.location.href = "login.html";
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        const errorMessage = errorMessages[error.code] || "Ocorreu um erro inesperado. Por favor, tente novamente.";
        alert(`Erro ao cadastrar:  ${errorMessage}`);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleSenha = document.getElementById("toggle-senha");
    const senhaInput = document.getElementById("senha");

    const toggleConfirmaSenha = document.getElementById("toggle-confirma-senha");
    const confirmaSenhaInput = document.getElementById("confirma-senha");

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
    toggleConfirmaSenha.addEventListener("click", () => toggleVisibility(confirmaSenhaInput, toggleConfirmaSenha));
});