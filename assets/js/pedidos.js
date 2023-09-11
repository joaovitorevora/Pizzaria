// Variável para armazenar o valor total dos pedidos
var totalAmount = 0;

// Função para atualizar o valor total
function updateTotal() {
    var totalElement = document.querySelector(".total-price");
    totalElement.textContent = "Total: R$" + totalAmount.toFixed(2);
}

// Função para adicionar um item ao carrinho
function addToCart(itemName, itemPrice) {
    // Crie um novo elemento de lista para o item
    var listItem = document.createElement("li");
    
    // Conteúdo do item (nome, preço e botão de exclusão)
    listItem.innerHTML = `
        ${itemName} - R$${itemPrice}
        <button class="remove-button">Remover</button>
    `;

    // Adicione um evento de clique ao botão de exclusão
    var removeButton = listItem.querySelector(".remove-button");
    removeButton.addEventListener("click", function() {
        removeItemFromCart(listItem);
    });

    // Adicione o item à lista de pedidos
    var orderList = document.querySelector("#order-list");
    orderList.appendChild(listItem);

    // Atualize o total de preço
    totalAmount += parseFloat(itemPrice);
    updateTotal();
}

// Função para remover um item do carrinho
function removeItemFromCart(item) {
    var orderList = document.querySelector("#order-list");
    
    // Remova o item da lista de pedidos
    orderList.removeChild(item);

    // Atualize o total de preço
    var itemPrice = item.textContent.match(/R\$(\d+\.\d+)/);
    if (itemPrice) {
        totalAmount -= parseFloat(itemPrice[1]);
        updateTotal();
    }
}

// Função para finalizar o pedido
function checkout() {
    var orderList = document.querySelector(".order-list");

    // Verifique se a lista de pedidos está vazia
    if (orderList.children.length === 0) {
        Swal.fire({
            title: "Carrinho Vazio!",
            text: "Adicione itens ao carrinho antes de finalizar o pedido.",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        Swal.fire({
            title: "Pedido Finalizado!",
            text: "Seu pedido foi enviado com sucesso!",
            icon: "success",
            confirmButtonText: "OK"
        });
    }
}

// Adicione eventos de clique aos botões de pedidos de pizza e bebida
function addOrderButtonClickEvent(button, itemName, itemPrice) {
    button.addEventListener("click", function() {
        addToCart(itemName, itemPrice);
    });
}

var pizzaButtons = document.querySelectorAll(".pizza-card .order-button");
pizzaButtons.forEach(function(button) {
    var pizzaName = button.parentNode.querySelector("h3").textContent;
    var pizzaPrice = button.parentNode.querySelector(".price").textContent.replace("Preço: R$", "");
    addOrderButtonClickEvent(button, pizzaName, pizzaPrice);
});

var refriButtons = document.querySelectorAll(".refri-card .order-button");
refriButtons.forEach(function(button) {
    var refriName = button.parentNode.querySelector("h3").textContent;
    var refriPrice = button.parentNode.querySelector(".price").textContent.replace("Preço: R$", "");
    addOrderButtonClickEvent(button, refriName, refriPrice);
});

// Adicione um evento de clique ao botão "Finalizar Pedido"
var checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", function() {
    checkout();
});