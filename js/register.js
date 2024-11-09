import { db } from './inicializador-firebase.js'; // Importando a instância do Firebase
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirma-senha").value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

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
        alert("Erro ao cadastrar: " + error.message);
    }
});