<?php
// Verifique se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conecte-se ao banco de dados MySQL
    $conn = new mysqli("localhost:3306", "root", "Admin@unip", "pizzaria");

    // Verifique a conexão
    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    // Captura os dados do formulário
    $nome = $_POST["nome_cad"];
    $cpf = $_POST["cpf_cad"];
    $email = $_POST["email_cad"];
    $senha = $_POST["senha_cad"];

    // Prepara a consulta SQL para inserir o cliente
    $sql = "INSERT INTO clientes (nome, cpf, email, senha) VALUES (?, ?, ?, ?)";

    // Prepara a declaração SQL
    $stmt = $conn->prepare($sql);

    // Verifique se a preparação da consulta foi bem-sucedida
    if ($stmt === false) {
        die("Erro na preparação da consulta: " . $conn->error);
    }

    // Associa os parâmetros à declaração
    $stmt->bind_param("ssss", $nome, $cpf, $email, $senha);

    // Executa a consulta
    if ($stmt->execute()) {
        echo '<script>
                alert("Credenciais inválidas. Tente novamente.");
                window.location.href = "../../index.html";
            </script>';
    } else {
        echo "Erro ao cadastrar o cliente: " . $stmt->error;
    }

    // Fecha a declaração e a conexão
    $stmt->close();
    $conn->close();
}
?>
