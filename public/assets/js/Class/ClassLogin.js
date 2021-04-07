import firebase from '../firebase';
import Utils from '../Class/ClassUtils';

class Login
{

    constructor()
    {
        this.utils = new Utils();
        this.auth = firebase.auth();
    }

    checkAuth()
    {
        this.auth.onAuthStateChanged((user)=>{
            if (user) {
                //window.location.href = 'index.html';
            } else {
                window.location.href = 'login.html';
            }
        })
    }

    authenticate(values)
    {
        this.auth.signInWithEmailAndPassword(values.access_email, values.access_password)
        .then(response => {
            window.location.href = 'index.html';
        })
        .catch(error => {
            this.utils.showAlert("access", "error", this.utils.errorHandler(error.code))
        }).finally(() => {
            
        })
    }

    createAccount(values)
    {

        this.auth.createUserWithEmailAndPassword(values.signup_email, values.signup_password)
        .then((response)=>{
            const { user } = response;

            console.log(response)

            user.updateProfile({
                displayName: name
            })

            window.location.href = 'index.html';
            
        })
        .catch((error)=>{
            alert(error);
        });
    }

    recoveryPassword(value)
    {
        this.auth.sendPasswordResetEmail(value.forget_email)
        .then(() => {
            sessionStorage.setItem("success", "As instruções para alterar sua senha foram enviados ao seu e-mail");
            window.location.href = 'login.html'
        })
        .catch((error) => {
            sessionStorage.setItem("error", this.utils.errorHandler(error.code));
            window.location.href = 'login.html'
        })
    }

    changeSection()
    {
        document.querySelectorAll("#login section").forEach((item)=>{
            item.classList.remove("show")
        })

        let hash = window.location.hash;
        const section = document.querySelector("#login")
        const signup = section.querySelector("section.signup");
        const access = section.querySelector("section.access");
        const forget = section.querySelector("section.forget");
        switch(hash) {
            case '#signup':
                signup.classList.add("show")
            break;
            case '#forget':
                forget.classList.add("show")

            break;
            default:
                access.classList.add("show")
            break;
        }
    }
}


export default Login;