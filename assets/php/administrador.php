<?php
// Conexão com o banco de dados MySQL
$servername = "localhost:3306";
$username = "root";
$password = "Admin@unip";
$dbname = "pizzaria";

// Crie uma conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Receba os dados enviados via AJAX
$data = json_decode(file_get_contents("php://input"));

$nome = $data->name;
$descricao = $data->description;
$preco = $data->price;
$imagem = $data->imageSrc;

// Verifique se todos os campos estão preenchidos
if (!empty($nome) && !empty($descricao) && !empty($preco)) {
    // Insira os dados da pizza no banco de dados
    $sql = "INSERT INTO pizzas (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssds", $nome, $descricao, $preco, $imagem);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
} else {
    echo "error";
}

if (isset($_POST["editPizza"])) {
    // Caso a ação seja "editPizza", trata-se de editar uma pizza
    $pizzaId = $_POST["pizzaId"];
    $newName = $_POST["newName"];
    $newDescription = $_POST["newDescription"];
    $newPrice = $_POST["newPrice"];
    $newImageSrc = $_POST["newImageSrc"];

    // Verifique se todos os campos estão preenchidos
    if (!empty($pizzaId) && !empty($newName) && !empty($newDescription) && !empty($newPrice)) {
        // Atualize os dados da pizza no banco de dados usando o ID recebido
        $sql = "UPDATE pizzas SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdsi", $newName, $newDescription, $newPrice, $newImageSrc, $pizzaId);

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error";
        }

        $stmt->close();
    } else {
        echo "error";
    }
}


// Feche a conexão com o banco de dados
$conn->close();
?>
