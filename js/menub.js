//objetivo abrir e fechar menu amburguer
//adicionar e remover a classe active

document.addEventListener('DOMContentLoaded', () => {
    const menuBurger = document.querySelector('.menu-burger');
    const header = document.querySelector('.header');

    menuBurger.addEventListener('click', () => {
        header.classList.toggle('active');
    });
});

