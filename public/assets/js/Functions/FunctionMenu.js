import Menu from '../Class/ClassMenu';

const menu = new Menu();

const headerMenu = document.querySelector("#app header button");
const menuContent = document.querySelector("#app header nav");

if (headerMenu) {
    headerMenu.addEventListener("click", ()=>{
        menu.menuHandler(menuContent)
    });
}
