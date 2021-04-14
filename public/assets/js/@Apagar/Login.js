import { checkLogin, changeSection, recoveryPassword, createAccount, authenticate } from './Functions/Login'
import { getFormValues, showAlert } from './Functions/Utils'

document.querySelectorAll("#login").forEach((page)=>{
    
    checkLogin();

    window.addEventListener("load", ()=>{
        changeSection(window.location.hash)
    });
    window.addEventListener("hashchange", ()=>{
        changeSection(window.location.hash)
    });

    const signupForm = page.querySelector(".signup form");
    if (signupForm) {

        signupForm.querySelectorAll("input").forEach((input)=>{
            input.addEventListener("focus", (e)=>{
                e.target.closest("div").classList.add("input-focus");
            })
            input.addEventListener("blur", (e)=>{
                e.target.closest("div").classList.remove("input-focus");
            })
        })

        signupForm.addEventListener("submit", (e)=>{

            e.preventDefault();

            const button = signupForm.querySelector("button");
            const field = signupForm.querySelectorAll(".field");
            const inputs = signupForm.querySelectorAll("input");

            inputs.forEach((input)=>{
                input.disabled = true;
            })

            field.forEach((item)=>{
                item.classList.add("loading");
            })

            button.disabled = true;
            button.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>`;

            createAccount(getFormValues(signupForm));

        });
    }

    const accessForm = page.querySelector(".access form");
    if (accessForm) {

        if (sessionStorage.getItem("success")) {
            showAlert("access", "success", sessionStorage.getItem("success"));
            sessionStorage.removeItem("success");
        }
        if (sessionStorage.getItem("error")) {
            showAlert("access", "error", sessionStorage.getItem("error"));
            sessionStorage.removeItem("error");
        }

        accessForm.addEventListener("submit", (e)=>{ 
            e.preventDefault();

            const button = accessForm.querySelector("button");

            button.disabled = true;
            button.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>`;

            authenticate(getFormValues(accessForm));


        });
    }


    const forgetForm = page.querySelector(".forget form");
    if (forgetForm) {

        forgetForm.addEventListener("submit", (e)=>{

            e.preventDefault();

            const button = forgetForm.querySelector("button");

            button.disabled = true;
            button.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>`;
            

            recoveryPassword(getFormValues(forgetForm));

        });

    

    }

})