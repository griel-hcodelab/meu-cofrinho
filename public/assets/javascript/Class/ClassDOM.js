import Utils from './ClassUtils';
import ClassFirebase from './ClassFirebase';

class ClassDOM
{
    constructor(uid)
    {
        this.uid = uid;
        this.util = new Utils();
        this.db = new ClassFirebase();
    }

    renderVaults(vaults)
    {

        const vaultsTag = document.querySelector("section#vaults div.contents")

        vaultsTag.innerHTML = '';


        vaults.forEach((item)=>{


            
            let vaulted;
            this.db.data().collection(`vaults/${this.uid}/vault/${item.vault_id}/values`).get()
            .then(snapshot => {
                let sum = [];
                snapshot.forEach(item => {
                    console.log('itemdata', item.data().value)
                    sum.push(parseFloat(item.data().value))
                })
                console.log('sum', sum)
                let result = ()=>{
                    const calc = sum.reduce((item, total)=>{
                        return item+total
                    })
    
                    if (typeof calc == "string") {
                        vaulted = "R$0,00"
                    } else {
                        vaulted = this.util.formatPrice(calc);
                    }
                }
                result();
                console.log('vaulted', vaulted)

                this.util.appendToTemplate(vaultsTag, 'details', `
                <summary>${item.vault_identify}</summary>
                <p>Necessário: <strong>${this.util.formatPrice(item.vault_value)}</strong></p>
                <p>Você tem: <strong>${vaulted}</strong></p>
                <a id="${item.vault_id}">
                    <img src="assets/svg/edit.svg" alt="Editar ${item.vault_identify}" />
                    editar seu cofrinho
                </a>
                `)

                document.querySelectorAll("details a").forEach((a)=>{
                    console.log(a)
                    a.addEventListener("click", (e)=>{
                        e.preventDefault();

                        window.location.hash = "#edit_vault"

                        console.log(this.db.select(e.target.id, this.uid))
                    })
                })
            });
            
        })

        
    }

    renderVault(id)
    {
        const section = document.querySelector("section#edit_vault");

        console.log(id, section)

        this.db.data().collection(`vaults/${this.uid}/vault`).onSnapshot(snapshot => {
            const vaults = []
            snapshot.forEach(item => {
                vaults.push(item.data());
                
            })
            console.log(this.db.select(vaults))
        });
    }
}

export default ClassDOM;