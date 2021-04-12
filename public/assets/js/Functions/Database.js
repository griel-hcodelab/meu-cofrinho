import firebase from '../Firebase/Firebase';
import { renderVault, renderVaults } from './Render'
import { clearAllInputs, getRandom, getToday, menuHandler } from './Utils';
const auth = firebase.auth();
const db = firebase.firestore();

let userData;

export function authenticate()
{
    auth.onAuthStateChanged((user)=>{
        if (user) {
            userData = user;
        }
    })
}
authenticate();

export function insert(vaultId, data = {})
{
    const vault = db.collection(`vaults/${userData.uid}/vault`).doc(vaultId);
    const vaultValues = db.collection(`vaults/${userData.uid}/vault/${vaultId}/values`).doc(getRandom());

    let add_cash = 0;
    if (data.vault_add_cash !== '') {
        add_cash = data.vault_add_cash;
    } 


    vault.set({
        "vault_id":vaultId,
        "vault_identify": data.vault_identify,
        "vault_value":data.vault_value,
        "vault_description":data.vault_description,
    })
    .then(() => {

    })
    .catch((error) => {
        console.error('erro', error)
    });

    vaultValues.set({
        "id":getRandom(),
        "date":getToday(),
        "value":add_cash,
        "where":data.vault_add_local

    })
    .then(() => {
        window.location.hash = "#home";
        clearAllInputs();
        authenticate();
    })
    .catch((error) => {
        console.error('erro', error)
    });
}

export function insertValue(id, data = {})
{
    const random = getRandom();
    const vaultValues = db.collection(`vaults/${userData.uid}/vault/${id}/values`).doc(random);

    vaultValues.set({
        "id":random,
        "date":getToday(),
        "value":data.vault_add_cash,
        "where":data.vault_add_local

    })
    .then(() => {
        window.location.hash = "#home";
        clearAllInputs();
        authenticate();
    })
    .catch((error) => {
        console.error('erro', error)
    });
}

export function select(vaultId)
{
    let vault;
    let vaultValues = [];

    db.collection(`vaults/${userData.uid}/vault`).doc(vaultId).get()
    .then((doc)=>{

        vault = doc.data();

        db.collection(`vaults/${userData.uid}/vault`).doc(vaultId).collection("values").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                vaultValues.push(doc.data());
                renderVault(vault, vaultValues);
            });
        });

        
    })

}

export function deleteHistory(vaultId, id)
{

    console.log(vaultId, id)



    db.collection(`vaults/${userData.uid}/vault`).doc(vaultId).collection("values").doc(id).delete()
    .then(() => {

        document.querySelector(`.id-${id}`).remove()
        select(vaultId);

    }).catch((error) => {
        
    });

}