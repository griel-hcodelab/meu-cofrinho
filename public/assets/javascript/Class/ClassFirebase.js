import Firebase from '../Firebase/Firebase';
import Utils from './ClassUtils';
import ClassDOM from '../Class/ClassDOM';

class ClassFirebase
{
    constructor() 
    {
        this.db = Firebase.firestore();
        this.utils = new Utils();
        this.storage = Firebase.storage();
    }

    data()
    {
        return this.db;
    }

    getStorage()
    {
        return this.storage;
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

    insertValue(id, uid, data = {})
    {
        const random = this.utils.getRandom();
        const vaultValues = this.db.collection(`vaults/${uid}/vault/${id}/values`).doc(random);

        vaultValues.set({
            "id":random,
            "date":this.utils.getToday(),
            "value":data.vault_add_cash,
            "where":data.vault_add_local

        })
        .then(() => {
            this.utils.clearAllInputs();

            const sum = [];

            document.querySelectorAll("#history span.value_history").forEach((item)=>{

                const value = item.innerHTML.replace("R$&nbsp;","").replace(",",".")
                
                sum.push(parseFloat(value))

                const result = sum.reduce((item, total)=>{
                    return eval(item+total);
                })
                
                document.querySelector(".value strong.vaulted").innerHTML = this.utils.formatPrice(result);
                
            })
        })
        .catch((error) => {
            console.error('erro', error)
        });
    }

    delete(vaultId, uid)
    {

        console.log(vaultId, uid)
        this.db.collection(`vaults/${uid}/vault`).doc(vaultId).delete()
        .then(() => {

            //window.location.hash = "#home";

        }).catch((error) => {
            console.log(error)
        });
    }

    deleteHistory(vaultId, uid, id)
    {
        this.db.collection(`vaults/${uid}/vault/${vaultId}/values`).doc(id).delete()
        .then(() => {

            document.querySelector(`.id-${id}`).remove();

            const sum = [];

            document.querySelectorAll("#history span.value_history").forEach((item)=>{

                console.log(item)

                const value = item.innerHTML.replace("R$&nbsp;","").replace(",",".")
                
                sum.push(parseFloat(value))

                let result = 0;

                result = sum.reduce((item, total)=>{
                    return eval(item+total);
                }, 0)

                document.querySelector(".value strong.vaulted").innerHTML = this.utils.formatPrice(result);
                
            })

            console.log('sum', sum)

            if (sum.length == 0) {
                document.querySelector(".value strong.vaulted").innerHTML = "R$ 0,00";
            }
           

        }).catch((error) => {
            console.log(error)
        });
    }

    updateProfile(uid, data = {})
    {
        console.log(uid, data)

        const profile = this.db.collection(`profile`).doc(uid);

        profile.set({
            "name":data.name,
            "birthday":data.birthday,
            "zipcode":data.zipcode,
            "address":data.address,
            "district":data.district,
            "city":data.city,
            "state":data.state,

        })
    }

    selectProfile(uid)
    {
        let profile;

        this.db.collection('profile').doc(uid).get()
        .then((doc)=>{

            profile = doc.data();

        });

        return profile;
    }

}

export default ClassFirebase;