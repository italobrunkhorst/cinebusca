import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db } from './inicializador-firebase.js';

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();

    // Verificar se o usuário está logado
    auth.onAuthStateChanged(user => {
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