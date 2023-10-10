function editPizza(button) {
    // Encontre o elemento pai da pizza a ser editada
    var pizzaDiv = button.closest(".pizza-card");
    
    // Obtenha os detalhes da pizza a ser editada
    var pizzaName = pizzaDiv.querySelector("h3").textContent;
    var pizzaDescription = pizzaDiv.querySelector("p:nth-child(2)").textContent;
    var pizzaPrice = pizzaDiv.querySelector(".price").textContent.replace("Preço: R$", "");
    
    // Envie uma solicitação AJAX para obter o ID da pizza com base no nome
    fetch('assets/php/editar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            getPizzaId: true,
            pizzaName: pizzaName
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.pizzaId) {
            // Se a solicitação retornar um ID de pizza válido, abra o modal de edição com o ID
            openEditPizzaModal(data.pizzaId, pizzaName, pizzaDescription, pizzaPrice);
        } else {
            // Trata o caso em que o ID da pizza não foi encontrado
            Swal.fire('Erro', 'Não foi possível encontrar o ID da pizza.', 'error');
        }
    })
    .catch(error => {
        Swal.fire('Erro', 'Erro ao obter o ID da pizza.', 'error');
    });
}

function openEditPizzaModal(pizzaId, pizzaName, pizzaDescription, pizzaPrice) {
    // Cria um modal de edição personalizado com SweetAlert2, passando o pizzaId
    Swal.fire({
        title: 'Editar Pizza',
        html:
            `<input id="pizzaId" type="hidden" value="${pizzaId}">` + // Adicione o campo oculto para o ID
            `<input id="pizzaName" class="swal2-input" value="${pizzaName}" placeholder="Nome da Pizza">` +
            `<textarea id="pizzaDescription" class="swal2-input" placeholder="Descrição da Pizza">${pizzaDescription}</textarea>` +
            `<input id="pizzaPrice" class="swal2-input" value="${pizzaPrice}" placeholder="Preço da Pizza">` +
            `<input id="pizzaImage" type="file" class="swal2-file" placeholder="Escolher uma Imagem">`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Salvar',
        preConfirm: () => {
            // Pega os valores dos campos do modal, incluindo o ID
            var pizzaId = Swal.getPopup().querySelector('#pizzaId').value;
            var newName = Swal.getPopup().querySelector('#pizzaName').value;
            var newDescription = Swal.getPopup().querySelector('#pizzaDescription').value;
            var newPrice = Swal.getPopup().querySelector('#pizzaPrice').value;
            var newImage = Swal.getPopup().querySelector('#pizzaImage').files[0];

            // Envie os dados para o PHP usando AJAX para atualizar a pizza no banco de dados
            return fetch('assets/php/editar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pizzaId, newName, newDescription, newPrice, newImage })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    Swal.fire('Sucesso', 'Pizza atualizada com sucesso!', 'success');
                    // Atualize os detalhes da pizza no cartão correspondente se desejar
                } else {
                    Swal.fire('Erro', 'Erro ao atualizar pizza.', 'error');
                }
            })
            .catch(error => {
                Swal.fire('Erro', 'Erro ao enviar dados ao servidor.', 'error');
            });
        }
    });
}


// Função para adicionar uma pizza ao container
function addPizzaToContainer(name, description, price, imageSrc) {
    var pizzaContainer = document.getElementById("pizzaContainer");

    // Criar um novo card de pizza com os detalhes fornecidos
    var pizzaCard = document.createElement("div");
    pizzaCard.className = "pizza-card";
    pizzaCard.innerHTML = `
        <div class="pizza-info">
            <h3>${name}</h3>
            <p>${description}</p>
            <p class="price">Preço: R$${price}</p>
            <button class="edit-button" onclick="editPizza(this)">Editar</button>
        </div>
        <img src="${imageSrc}" alt="${name}" class="pizza-image">
    `;

    // Adicionar o novo card ao container-cards
    pizzaContainer.appendChild(pizzaCard);
    
    // Atualizar o evento de clique do botão "Editar" para todas as pizzas
    var editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach(function(button) {
        button.onclick = function() {
            editPizza(this);
        };
    });
}

// Variável para armazenar temporariamente a imagem selecionada
var selectedImage = null;

// Função para abrir o modal de adição de pizza com SweetAlert
function openAddPizzaModalWithSweetAlert() {
    Swal.fire({
        title: 'Adicionar Nova Pizza',
        html: `
            <label for="addPizzaName">Nome da Pizza:</label>
            <input type="text" id="addPizzaName" name="addPizzaName" required>
            <br>
            <label for="addPizzaDescription">Descrição da Pizza:</label>
            <textarea id="addPizzaDescription" name="addPizzaDescription" required></textarea>
            <br>
            <label for="addPizzaPrice">Preço da Pizza:</label>
            <input type="text" id="addPizzaPrice" name="addPizzaPrice" required>
            <br>
            <label for="addPizzaImage">Escolher uma Imagem:</label>
            <input type="file" id="addPizzaImage" name="addPizzaImage" accept="image/*" onchange="handleImageUpload(event)">
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#addPizzaName').value;
            const description = Swal.getPopup().querySelector('#addPizzaDescription').value;
            const price = Swal.getPopup().querySelector('#addPizzaPrice').value;
            
            // Verificar se uma imagem foi selecionada
            const imageSrc = selectedImage ? selectedImage : "assadminets/img/default-pizza.png";

            if (!name || !description || !price) {
                Swal.showValidationMessage('Por favor, preencha todos os campos.');
                return false;
            }

            // Enviar os dados para o PHP usando AJAX
            return fetch('assets/php/administrador.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, price, imageSrc })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    Swal.fire('Sucesso', 'Pizza adicionada com sucesso!', 'success');
                    addPizzaToContainer(name, description, price, imageSrc);
                } else {
                    Swal.fire('Erro', 'Erro ao adicionar pizza.', 'error');
                }
            })
            .catch(error => {
                Swal.fire('Erro', 'Erro ao enviar dados ao servidor.', 'error');
            });
        }
    });
}


// Função para lidar com a seleção de imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Evento de clique no botão "Adicionar Pizza" para abrir o SweetAlert
document.getElementById("addPizzaButton").addEventListener("click", function() {
    openAddPizzaModalWithSweetAlert();
});