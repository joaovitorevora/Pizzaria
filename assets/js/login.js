document.addEventListener("DOMContentLoaded", function () {
    // Obtem o formulário de login pelo ID
    var loginForm = document.getElementById("login");

    // Adiciona um evento de envio ao formulário
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Impedir o envio padrão do formulário

        // Obtem os valores do campo de email e senha
        var email = document.getElementById("email_login").value;
        var senha = document.getElementById("senha_login").value;

        // Verifique se as credenciais correspondem às credenciais do administrador (dados mocados)
        if (email === "admin@exemplo.com" && senha === "admin") {
            Swal.fire({
                title: "Login efetuado com sucesso!",
                text: "Bem-vindo administrador!",
                icon: 'success',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                // Redirecionando para a página de administrador
                window.location.replace("administrador.html");
            }, 3000); // 3000 milissegundos = 3 segundos
            
        } else {
            // Credenciais inválidas, mensagem de erro
            Swal.fire({
                title: "Login ou senha inválidos!",
                text: "Digite um login ou senha válidos.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });
});