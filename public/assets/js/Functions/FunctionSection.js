import Section from '../Class/ClassSection';

const section = new Section();

const page = document.querySelector("#app main");

if (page) {

    const sections = page.querySelectorAll("section");
    const vaults = page.querySelector("section#vaults");
    const newVault = page.querySelector("section#new_vault");
    const editVault = page.querySelector("section#edit_vault");


    window.addEventListener("load", ()=>{
        section.changeSection(window.location.hash);
    });
    window.addEventListener("hashchange", ()=>{
        section.changeSection(window.location.hash);
    });

    if (window.innerWidth >= 768) {
        document.querySelectorAll("details").forEach((tag)=>{
            tag.setAttribute('open', 'open');
        });
    }

}