import Login from './ClassLogin';
import Utils from './ClassUtils';

//Novas Classes
const loginFn = new Login();
const utils = new Utils();

//Declarando variáveis
const signupForm = document.querySelector(".signup form");


loginFn.checkAuth();

window.addEventListener("load", ()=>{
    loginFn.changeSection();
});
window.addEventListener("hashchange", ()=>{
    loginFn.changeSection();
});

if (signupForm) {
    signupForm.addEventListener("submit", (e)=>{

        e.preventDefault()

        const inputs = document.querySelectorAll("input:required");
        const name = document.querySelector("input[name=signin-name]").value;
        const email = document.querySelector("input[name=signin-email]").value;
        const password = document.querySelector("input[name=signin-password]").value;
    
        if (utils.checkInputs(inputs)) {
            loginFn.createAccount(name, email, password);
        }
    
        
    });
}
