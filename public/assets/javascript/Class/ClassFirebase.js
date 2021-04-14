import Firebase from '../Firebase/Firebase';
import Utils from './ClassUtils';
import ClassDOM from '../Class/ClassDOM';

class ClassFirebase
{
    constructor()
    {
        this.db = Firebase.firestore();
        this.utils = new Utils();
    }

    data()
    {
        return this.db;
    }

    insert(data = {}, uid)
    {

        let add_cash = 0;
        if (data.vault_add_cash !== '') {
            add_cash = data.vault_add_cash;
        } 

        const vaultId = this.utils.getRandom()

        const vault = this.db.collection(`vaults/${uid}/vault`).doc(vaultId);

        vault.set({
            "vault_id":vaultId,
            "vault_identify": data.vault_identify,
            "vault_value":data.vault_value,
            "vault_description":data.vault_description,
        })
        
        
        const vaultValuesCode = this.utils.getRandom();

        const vaultValues = this.db.collection(`vaults/${uid}/vault/${vaultId}/values`).doc(vaultValuesCode);

        vaultValues.set({
            "id":vaultValuesCode,
            "date":this.utils.getToday(),
            "value":add_cash,
            "where":data.vault_add_local
    
        })
        .then(()=>{
            window.location.hash = "#home";
            this.utils.clearAllInputs();
        })

        /**
         * vault_identify: "fdsfds", vault_value: "3232", vault_description: "fdsfsdfds"
         */
    }

    select(vaultId, uid)
    {
        let vault;
        let vaultValues = [];

        const dom = new ClassDOM();

        this.db.collection(`vaults/${uid}/vault`).doc(vaultId).get()
        .then((doc)=>{

            vault = doc.data();

            this.db.collection(`vaults/${uid}/vault`).doc(vaultId).collection("values").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    vaultValues.push(doc.data());
                    
                    dom.renderVault(vault, vaultValues);
                });
            });

            

            
            
            
        })


    }
}

export default ClassFirebase;