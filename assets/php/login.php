<?php
// Conecte-se ao banco de dados
$hostname = 'localhost:3306';
$username = 'root';
$password = 'Admin@unip';
$database = 'pizzaria';

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

//valores do formulário
$email = $_POST['email_login'];
$senha = $_POST['senha_login'];

// Consulta SQL para verificar as credenciais de administrador
$queryAdmin = "SELECT * FROM administradores WHERE email = '$email' AND senha = '$senha'";
$resultAdmin = $conn->query($queryAdmin);

// Consulta SQL para verificar as credenciais de cliente
$queryCliente = "SELECT * FROM clientes WHERE email = '$email' AND senha = '$senha'";
$resultCliente = $conn->query($queryCliente);

if ($resultAdmin->num_rows > 0) {
    // Credenciais de administrador válidas, redirecionANDO para a página de administrador
    echo '<script>
        alert("Bem-vindo Administrador!");
        window.location.href = "../../adm2.html";
    </script>';
} elseif ($resultCliente->num_rows > 0) {
    // Credenciais de cliente válidas, redirecionando para a página de cliente
    echo '<script>
        alert("Bem-vindo!");
        window.location.href = "../../index.html";
    </script>';
} else {
    // Credenciais inválidas, alerta de erro e redirecionando para a página de login
    echo '<script>
        alert("Credenciais inválidas. Tente novamente.");
        window.location.href = "../../login.html";
    </script>';
}

// Fechando a conexão com o banco de dados
$conn->close();
?>
