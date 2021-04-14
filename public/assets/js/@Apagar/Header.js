import firebase from './Firebase/Firebase';
import { menuHandler } from './Functions/Utils';

const auth = firebase.auth();

document.querySelectorAll("#app").forEach((page)=>{
    const username = page.querySelector("header nav .profile strong");
    auth.onAuthStateChanged((user)=>{
        if (user) {
            username.innerHTML = user.displayName;
        } else {
            window.location.href = '/login.html';
        }
    })

    const menu = page.querySelector("header button");
    if (menu) {
        menu.addEventListener("click", (e)=>{
            e.preventDefault();
            menuHandler(page.querySelector("header nav"))
        })
    }

    const logo = page.querySelector("header div.logo");
    if (logo) {
        logo.addEventListener("click", ()=>{
            window.location.hash = "#home";
        })
    }

    const signout = page.querySelector("header nav a#signout");
    if (signout) {
        signout.addEventListener("click", (e)=>{
            e.preventDefault();
            auth.signOut();
        })
    }
})