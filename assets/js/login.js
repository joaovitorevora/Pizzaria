document.addEventListener("DOMContentLoaded", function () {
    // Obtem o formulário de login pelo ID
    var loginForm = document.getElementById("login");

    // Altere o atributo 'action' do formulário para apontar para o arquivo PHP
    loginForm.action = "login.php";
});
