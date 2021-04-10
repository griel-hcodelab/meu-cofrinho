import firebase from '../firebase';
import Utils from '../Class/ClassUtils';

class Login
{

    constructor()
    {
        this.utils = new Utils();
        this.auth = firebase.auth();

        this.authStatus = Boolean();

        this.userid;

        this.changeSection();

    }

    checkAuth()
    {

        this.auth.onAuthStateChanged((user)=>{
            if (user) {
                this.userid = user.uid;
                console.log('logado', this.userid)
                
            } else {
                console.log('não logado')
                if (window.location.pathname != "/login.html") {
                    window.location.href = 'login.html';
                }
                return this.authStatus = false
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
            this.utils.showAlert("access", "error", this.utils.errorHandler(error.code));
            document.querySelector(".access form button").innerHTML = `<svg id="_057-check" data-name="057-check" xmlns="http://www.w3.org/2000/svg" width="78.661" height="78.661" viewBox="0 0 78.661 78.661">
            <g id="Grupo_263" data-name="Grupo 263">
              <g id="Grupo_262" data-name="Grupo 262">
                <path id="Caminho_141" data-name="Caminho 141" d="M39.33,0a39.33,39.33,0,1,0,39.33,39.33A39.373,39.373,0,0,0,39.33,0Zm0,72.568A33.237,33.237,0,1,1,72.568,39.33,33.276,33.276,0,0,1,39.33,72.568Z" fill="#fff"/>
              </g>
            </g>
            <g id="Grupo_265" data-name="Grupo 265" transform="translate(20.292 24.862)">
              <g id="Grupo_264" data-name="Grupo 264">
                <path id="Caminho_142" data-name="Caminho 142" d="M169.162,162.614a3.048,3.048,0,0,0-4.3.207l-18.584,20.463-8.978-9.127a3.046,3.046,0,0,0-4.344,4.271l11.238,11.424a3.043,3.043,0,0,0,2.172.911.365.365,0,0,1,.058,0,3.048,3.048,0,0,0,2.2-1l20.75-22.849A3.048,3.048,0,0,0,169.162,162.614Z" transform="translate(-132.079 -161.824)" fill="#fff"/>
              </g>
            </g>
          </svg>
          <span>enviar</span>`
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
        if (section) {
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
}


export default Login;