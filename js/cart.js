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

const addButtons = document.querySelectorAll('.add-button');

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
        updateCartAndTable();
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
    const products = getCartProducts();
    let total = 0;
    products.forEach(product => {
        total += product.quantity;
    });

    document.getElementById('cart-count').textContent = total;

}


//renderizar a tabela do carrinho
function renderCartTable() {
    const products = getCartProducts();
    const cartTableBody = document.querySelector('#modal-1-content tbody');
    cartTableBody.innerHTML = ''; //limpar a tabela antes de renderizar
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="td-product"><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
                <td class="item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</td>
                <td class="quantity">
                    <input type="number" class="input-quantity" data-id="${product.id}" value="${product.quantity}" min="1">
                </td>
                <td class="td-total">R$ ${(product.price * product.quantity).toFixed(2).replace('.', ',')}</td>
            <td>
                <button class="delete" data-id="${product.id}" id="delete"></button>
            </td>
        `;
        cartTableBody.appendChild(tr);
    });

}

//remover produtos do carrinho
//pegar botão de deletar do html / ouvir o clique no botão de deletar

const cartTableBody = document.querySelector('#modal-1-content tbody');
cartTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const id = event.target.dataset.id;
        removeFromCart(id);
    };
});

//adicionar evento de escuto no input de quantidade dentro do tbody
cartTableBody.addEventListener('change', (event) => {

    //atualizar valor total individual
    if (event.target.classList.contains('input-quantity')) {
        const products = getCartProducts();
        const product = products.find(product => product.id === event.target.dataset.id);
        let newQuantity = parseInt(event.target.value);
        if (product) {
            product.quantity = newQuantity;
        }
        saveCartProducts(products);
        updateCartAndTable();
    }
});

// remover do localStorage
// atualizar o DOM
function removeFromCart(id) {
    const products = getCartProducts();

    //filtrar o produto que não tem o id passado por parâmetro
    const updatedProducts = products.filter(product => product.id !== id);
    saveCartProducts(updatedProducts);
    updateCartAndTable();
}

//atualizar o total geral
function updateCartTotal() {
    const products = getCartProducts();
    let total = 0;
    products.forEach(product => {
        total += product.price * product.quantity;
    });
    document.querySelector('#cart-total').textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateCartAndTable() {
    updateCartCounter();
    renderCartTable();
    updateCartTotal();
}
updateCartAndTable();