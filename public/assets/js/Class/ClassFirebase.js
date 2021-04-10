import firebase from '../firebase';
import Utils from '../Class/ClassUtils';

class FirebaseCls {

    constructor()
    {
        this.db = firebase.firestore();
        this.util = new Utils();
    }

    insertVault(userId, vaultId, data = {})
    {

        console.log(userId, vaultId, data)

        const vault = this.db.collection(`vaults/${userId}/vault`).doc(vaultId);

        vault.set({
            "vault_identify": data.vault_identify,
            "vault_value":data.vault_value
    
        })
        .then(() => {
            console.log('pronto')
        })
        .catch((error) => {
            console.error('erro', error)
        });
    }

    selectVaults(userID)
    {

        this.db.collection(`vaults/${userID}/vault`).onSnapshot(snapshot => {
            console.log(snapshot)
            const vaults = [];
        
            snapshot.forEach(item => {
        
              vaults.push(item.data());
        
            })
        
            console.log(vaults)
        
        });
    }


}

export default FirebaseCls;

//18004 "bMfeffGTZnOcdnNlm0q61d0tie22" {vault_identify: "fsdfdsfd", vault_value: "34343", vault_add_cash: "4234343", vault_add_local: "fdsfdfds"}