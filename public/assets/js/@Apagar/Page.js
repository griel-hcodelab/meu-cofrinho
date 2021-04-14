import { insert } from "./Functions/Database";
import { changeSection, renderVaults, updateDetailsTag } from "./Functions/Render"
import { addOpen, getFormValues, getRandom, getToday } from "./Functions/Utils";
import firebase from './Firebase/Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

window.addEventListener("load", ()=>{
    changeSection(window.location.hash);
    addOpen();
});
window.addEventListener("hashchange", ()=>{
    changeSection(window.location.hash);
    addOpen();
});




document.querySelectorAll("main").forEach((page)=>{

    let userData;

    auth.onAuthStateChanged((user)=>{
        if (user) {
            userData = user;

            const newVault = page.querySelector("section#new_vault form")
            if (newVault) {
                newVault.addEventListener("submit", (e)=>{
                    e.preventDefault();

                    const values = getFormValues(newVault);
                    const vaultId = getRandom();
                    insert(vaultId, values)

                })
            }

            const vaults = [];
            const vaultValues = [];

            //Consultando os cofres
            db.collection(`vaults/${userData.uid}/vault`).onSnapshot(snapshot => {
                snapshot.forEach(item => {
                    vaults.push(item.data());

                    //Consultando os valores de cada cofre
                    db.collection(`vaults/${userData.uid}/vault/${item.data().vault_id}/values`).onSnapshot(snapshot => {
                        snapshot.forEach(item => {
                            vaultValues.push(item.data());
                            if (vaults.length >= 1) {
                                renderVaults(vaults, vaultValues)
                            }
                        })
                    });
                })
            });
        }
    });

    
    
    

    
    


})