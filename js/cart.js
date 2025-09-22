/*
Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
    - atualizar o contador
    - adicionar o produto no localStorage
    - atualizar a tabela HTML do carrinho

Objetivo 2 - remover produtos do carrinho:
    - ouvir o botão de deletar
    - remover do localStorage
    - atualizar o DOM e o total

Objetivo 3 - atualizar valores do carrinho:
    - ouvir mudanças de quantidade
    - recalcular total individual
    - recalcular total geral
*/



// const cartCounter = document.getElementById('cart-counter');
const addButtons = document.querySelectorAll('.add-button');
// const cartTableBody = document.querySelector('#cart-table tbody');
// const cartTotal = document.getElementById('cart-total');


addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product-item');
        const productId = productElement.dataset.id;
        const productName = productElement.querySelector('.product-name').textContent;
        const productImage = productElement.querySelector('img').getAttribute('src');
        const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('R$', '').replace('.', '').replace(',', '.'));

        //buscar a lista do carrinho no localStorage
        const cart = getCartProducts();
        //verificar se o produto já está no carrinho
        const existingProduct = cart.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            //adicionar o produto ao carrinho
            const product = {
                id: productId,
                name: productName,
                image: productImage,
                price: productPrice,
                quantity: 1
            };
            cart.push(product);
        }
        saveCartProducts(cart);
        updateCartCounter();
    });
});

function saveCartProducts(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartProducts() {
    const products = localStorage.getItem('cart');
    return products ? JSON.parse(products) : []; //retorna um array vazio se não houver produtos
}

//atualizar o contador do carrinho
function updateCartCounter() {
    const cart = getCartProducts();
    let total = 0;
    cart.forEach(product => {
        total += product.quantity;
    });

    document.getElementById('cart-count').textContent = total;
    
}

updateCartCounter();
