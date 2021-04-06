import firebase from './firebase';

class Login
{

    constructor()
    {
        this.auth = firebase.auth();
    }

    checkAuth()
    {
        this.auth.onAuthStateChanged((user)=>{
            if (user) {
                console.log('logado')
            } else {
                console.log('não logado')
            }
        })
    }

    createAccount(name, email, password)
    {
        this.auth.createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            const { user } = response;

            console.log(response)

            user.updateProfile({
                displayName: name
            })

            //window.location.href = 'index.html';
            
        })
        .catch((error)=>{
            alert(error);
        });
    }

    changeSection()
    {
        document.querySelectorAll("main#login section").forEach((item)=>{
            item.classList.remove("show")
        })

        let hash = window.location.hash;
        const section = document.querySelector("main#login")
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