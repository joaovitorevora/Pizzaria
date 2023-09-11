// adicionar o evento de clique ao botão finalizar pedido
document.querySelector(".checkout-button").addEventListener("click", function () {
    const orderList = document.querySelector("#order-list");
    const orderItems = orderList.querySelectorAll("li");

    // Verifica se há itens na lista de pedidos
    if (orderItems.length > 0) {
        // Exibe o popup do Sweet Alert com opções de pagamento
        Swal.fire({
            title: "Selecione a opção de pagamento",
            icon: "info",
            input: "radio",
            inputOptions: {
                cartao: "Cartão de Crédito",
                dinheiro: "Dinheiro",
                pix: "Pix",
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                //confirmação opção de pagamento selecionada
                const selectedPayment = result.value;
                if (selectedPayment){
                    Swal.fire("Pedido Finalizado!", `Você escolheu pagar com ${selectedPayment}.<br>Pague e retire seu pedido no balcão`, "success");
                } else {
                    Swal.fire({
                        title: "Erro!",
                        text: "Você precisa selecionar uma opção de pagamento.",
                        icon: "error",
                    });
                }
            }
        });
    } else {
        // Caso não haja itens na lista de pedidos, mensagem de erro
        Swal.fire({
            title: "Erro!",
            text: "Você precisa adicionar itens ao pedido antes de finalizar.",
            icon: "error",
        });
    }
});
