import firebase from '../firebase';
import firebaseFn from '../Class/ClassFirebase';
import Login from '../Class/ClassLogin';
import Utils from '../Class/ClassUtils';
import FirebaseCls from '../Class/ClassFirebase';

const util = new Utils();
const auth = new Login();
const fireFn = new FirebaseCls();




document.querySelectorAll("#app").forEach((page)=>{

    let userID;

    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            userID = user.uid;
        }

    });

    fireFn.selectVaults(userID);


    const newVault = document.querySelector("section#new_vault")

    const newVaultForm = newVault.querySelector("form");

    newVaultForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        let fields = util.getFormValues(newVaultForm);
        let vaultRandomId = util.getRandom();
        fireFn.insertVault(userID, vaultRandomId.toString(), fields)
    })


})

