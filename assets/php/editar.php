<?php
// Conexão com o banco de dados aqui
$servername = "localhost:3306";
$username = "root";
$password = "Admin@unip";
$dbname = "pizzaria";

// Crie uma conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}// Receba os dados enviados via AJAX


if (isset($_POST["getPizzaId"]) && isset($_POST["pizzaName"])) {
    $pizzaName = $_POST["pizzaName"];
    
    // Consulta SQL para encontrar o ID da pizza com base no nome
    $sql = "SELECT id FROM pizzas WHERE nome = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $pizzaName);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        if ($row) {
            $pizzaId = $row["id"];
            echo json_encode(array("pizzaId" => $pizzaId));
        } else {
            echo json_encode(array("error" => "Pizza não encontrada"));
        }
    } else {
        echo json_encode(array("error" => "Erro na consulta"));
    }
    
    $stmt->close();
} else {
    echo json_encode(array("error" => "Dados ausentes"));
}

// Fecha a conexão com o banco de dados
$conn->close();
?>

