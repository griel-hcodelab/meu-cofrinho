import Menu from '../Class/ClassMenu';

const menu = new Menu();

const headerMenu = document.querySelector("#app header button");
const menuContent = document.querySelector("#app header nav");

if (headerMenu) {
    headerMenu.addEventListener("click", ()=>{
        menu.menuHandler(menuContent)
    });
}

const linkLogo = document.querySelector("#app header .logo");
if (linkLogo) {
    linkLogo.addEventListener("click", ()=>{
        window.location.hash = "#";
    })
    
}