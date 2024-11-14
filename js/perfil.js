import { getAuth, signOut, onAuthStateChanged, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {doc, updateDoc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db } from './inicializador-firebase.js';

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
    
    // Verificar se o usuário está logado
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Esconder o botão "entrar" e mostrar "perfil"
            document.getElementById("entrar").style.display = "none";
            document.getElementById("perfil").style.display = "block";
            
            // Configurar o botão de logout
            const logoutButton = document.getElementById("logout-btn");
            if (logoutButton) {
                logoutButton.addEventListener("click", async () => {
                    await signOut(auth);
                    alert("Logout realizado com sucesso!");
                    window.location.href = "../index.html";
                });
            }
        }
    });
});

/*função para esconder ou mostrar os botão de entrar e perfil*/
document.addEventListener("DOMContentLoaded", () => {
    
    const entrarButton = document.getElementById("entrar");
    const perfilButton = document.getElementById("perfil");
    const logoutButton = document.getElementById("logout");

    const auth = getAuth();

     onAuthStateChanged(auth, (user) => {
        if (user) {
            // Se o usuário estiver logado, esconder o botão de entrar e mostrar o de perfil
            entrarButton.style.display = "none";
            perfilButton.style.display = "block";
        } else {
            // Se o usuário não estiver logado, garantir que o botão de entrar está visível
            entrarButton.style.display = "block";
            perfilButton.style.display = "none";
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                await signOut(auth);
                alert("Logout realizado com sucesso!");

                // Redirecionar para a página de login após o logout
               window.location.href = "index.html";
            } catch (error) {
                console.error("Erro ao fazer logout:", error);
                alert("Erro ao fazer logout: " + error.message);
            }
        });
    }
});

/*redefinir usuario*/
document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("user-name"); 
    const resetNameButton = document.getElementById("reset-name");
    const editNameContainer = document.getElementById("edit-name-container");
    const newNameInput = document.getElementById("new-name");
    const saveNameButton = document.getElementById("save-name");
    const cancelNameButton = document.getElementById("cancel-name");

    // Exibir usuario ao carregar a página
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            let userName = user.displayName; 

            if (!userName) {
                try {
                    const userDoc = await getDoc(doc(db, "usuarios", user.uid)); 
                    if (userDoc.exists()) {
                        userName = userDoc.data().nome; 
                    }
                } catch (error) {
                    console.error("Erro ao buscar nome:", error);
                }
            }

            if (userName) {
                userNameElement.textContent = `Bem-vindo, ${userName}!`;
            }
        }
    });

    // Exibir o campo de input para redefinir usuario
    resetNameButton.addEventListener("click", () => {
        editNameContainer.style.display = "block"; // Mostrar o campo de edição
        newNameInput.value = ""; // Limpar o campo de input
    });

    // Salvar o novo usuario
    saveNameButton.addEventListener("click", async () => {
        const newName = newNameInput.value.trim();
        if (newName) {
            const user = auth.currentUser;
            if (user) {
                try {
                    // Atualizar o nome no Firebase Authentication
                    await updateProfile(user, { displayName: newName });
                    // Atualizar o nome no Firestore
                    await updateDoc(doc(db, "usuarios", user.uid), {
                        nome: newName
                    });

                    // Exibir o novo nome na interface
                    userNameElement.textContent = `Bem-vindo, ${newName}!`;

                    // Esconder o campo de edição e limpar o input
                    editNameContainer.style.display = "none";
                    newNameInput.value = "";
                } catch (error) {
                    console.error("Erro ao atualizar nome:", error);
                    alert("Erro ao atualizar nome: " + error.message);
                }
            }
        } else {
            alert("Por favor, digite um nome válido.");
        }
    });

    // Cancelar a edição do nome
    cancelNameButton.addEventListener("click", () => {
        editNameContainer.style.display = "none"; // Esconder o campo de edição
    });
});

/*redefinir senha*/
document.addEventListener("DOMContentLoaded", () =>{
    const resetPasswordButton = document.getElementById("reset-password");
    const editPasswordContainer = document.getElementById("edit-password-container");
    const newPasswordInput = document.getElementById("new-password");
    const confirmNewPasswordInput = document.getElementById("confirm-new-password");
    const savePasswordButton = document.getElementById("save-password");
    const cancelPasswordButton = document.getElementById("cancel-password");

    resetPasswordButton.addEventListener("click", () => {
        editPasswordContainer.style.display = "block";
        newPasswordInput.value = "";
        confirmNewPasswordInput.value = "";
    });

    savePasswordButton.addEventListener("click", async () => {
        
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        if (newPassword !== confirmNewPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                const email = prompt("Por favor, insira seu e-mail para confirmar:");
                const currentPassword = prompt("Por favor, insira sua senha atual:");

                const credential = EmailAuthProvider.credential(email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                
                // Tenta atualizar a senha do usuário
                await updatePassword(user, newPassword);
                alert("Senha atualizada com sucesso!");
                editPasswordContainer.style.display = "none"; // Limpa os campos após a atualização
            } else {
                alert("Erro: usuário não está autenticado.");
            }
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            alert("Erro ao atualizar a senha: " + error.message);
        }
    });

    cancelPasswordButton.addEventListener("click", () => {
        editPasswordContainer.style.display = "none";
    });
});

document.querySelectorAll(".favorito-btn").forEach((button) => {
    const movieTitle = button.previousElementSibling.textContent; // Obtém o título do filme

    // Verifica se o filme está nos favoritos ao carregar a página
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "usuarios", user.uid, "favoritos", movieTitle);
            const docSnap = await getDoc(docRef);

            // Se o filme estiver favoritado, altera o botão para vermelho
            if (docSnap.exists()) {
                button.classList.add("favoritado");
                button.style.color = "red";
            }
        }
    });

    button.addEventListener("click", async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "usuarios", user.uid, "favoritos", movieTitle);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Remove dos favoritos
                await deleteDoc(docRef);
                button.classList.remove("favoritado");
                button.style.color = "white"; // Volta a cor do coração para preto
            } else {
                // Adiciona aos favoritos
                await setDoc(docRef, { titulo: movieTitle });
                button.classList.add("favoritado");
                button.style.color = "red"; // Muda a cor do coração para vermelho
            }
        } else {
            alert("Por favor, faça login para favoritar filmes.");
        }
    });
});
