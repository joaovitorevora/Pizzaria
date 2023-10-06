// Função para abrir o modal de edição
function editPizza(button) {
    // Encontre o elemento pai da pizza a ser editada
    var pizzaDiv = button.closest(".pizza-card");
    
    // Obtenha os detalhes da pizza a ser editada
    var pizzaName = pizzaDiv.querySelector("h3").textContent;
    var pizzaDescription = pizzaDiv.querySelector("p:nth-child(2)").textContent;
    var pizzaPrice = pizzaDiv.querySelector(".price").textContent.replace("Preço: R$", "");

    
    // Cria um modal de edição personalizado com SweetAlert2
    Swal.fire({
        title: 'Editar Pizza',
        html:
            `<input id="pizzaName" class="swal2-input" value="${pizzaName}" placeholder="Nome da Pizza">` +
            `<textarea id="pizzaDescription" class="swal2-input" placeholder="Descrição da Pizza">${pizzaDescription}</textarea>` +
            `<input id="pizzaPrice" class="swal2-input" value="${pizzaPrice}" placeholder="Preço da Pizza">` +
            `<input id="pizzaImage" type="file" class="swal2-file" placeholder="Escolher uma Imagem">`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Salvar',
        preConfirm: () => {
            // Pega os valores dos campos do modal
            var newName = Swal.getPopup().querySelector('#pizzaName').value;
            var newDescription = Swal.getPopup().querySelector('#pizzaDescription').value;
            var newPrice = Swal.getPopup().querySelector('#pizzaPrice').value;
            var newImage = Swal.getPopup().querySelector('#pizzaImage').files[0];

            // Atualiza os campos da pizza no cartão correspondente
            pizzaDiv.querySelector("h3").textContent = newName;
            pizzaDiv.querySelector("p:nth-child(2)").textContent = newDescription;
            pizzaDiv.querySelector(".price").textContent = "Preço: R$" + newPrice;

            // Atualiza a imagem da pizza
            if (newImage) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    pizzaDiv.querySelector(".pizza-image").src = e.target.result;
                };
                reader.readAsDataURL(newImage);
            }
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

            return { name, description, price, imageSrc };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, description, price, imageSrc } = result.value;
            addPizzaToContainer(name, description, price, imageSrc);
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





