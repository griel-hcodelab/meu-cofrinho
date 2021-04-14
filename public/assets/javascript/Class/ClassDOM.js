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

    updateEditLinks(id)
    {

        document.querySelector(`details a#id${id}`).addEventListener("click", (e)=>{
            console.log(e.target)
            this.renderVault(id)

            window.location.hash = "#edit_vault"
        })
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
                    sum.push(parseFloat(item.data().value))
                })
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

                this.util.appendToTemplate(vaultsTag, 'details', `
                <summary>${item.vault_identify}</summary>
                <p>Necessário: <strong>${this.util.formatPrice(item.vault_value)}</strong></p>
                <p>Você tem: <strong>${vaulted}</strong></p>
                <a id="id${item.vault_id}">
                    <img src="assets/svg/edit.svg" alt="Editar ${item.vault_identify}" />
                    editar seu cofrinho
                </a>
                `)

                this.updateEditLinks(item.vault_id)
            });

            
        })

        
        

        
    }




    renderVault(id)
    {
        const section = document.querySelector("section#edit_vault");

        let vault;
        let vaultValues = [];

        

        
        
        this.db.data().collection(`vaults/${this.uid}/vault`).doc(id).get()
        .then((doc)=>{

            vault = doc.data();
            
            let vaulted;

            this.db.data().collection(`vaults/${this.uid}/vault`).doc(id).collection("values").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    vaultValues.push(doc.data());
                    let sum = [];
                    snapshot.forEach(item => {
                        sum.push(parseFloat(item.data().value))
                    })
                    let result = ()=>{
                        const calc = sum.reduce((item, total)=>{
                            return item+total
                        })

                        if (typeof calc == "string") {
                            return "R$0,00"
                        } else {
                            return this.util.formatPrice(calc);
                        }
                    }
                    
                    vaulted = result();

                    section.innerHTML = ''

                    this.util.appendToTemplate(section, "header", `
                        <h2>${vault.vault_identify}</h2>
                    `);

                    

                    this.util.appendToTemplate(section, "div", `
                    <h3>${vault.vault_description}</h3>
                    <div class="values">
                        <div class="value">
                            <p>Valor:</p>
                            <strong contenteditable="true">${this.util.formatPrice(vault.vault_value)}</strong>
                        </div>
                        <div class="value">
                            <p>Guardado: </p><strong>${vaulted}</strong>
                        </div>
                    </div>
                    </div>
                    <hr />
                    <div id="history">
                    </div>
                    `,{
                        "class":"contents"
                    });

                    const history = document.querySelector("div#history");
                    vaultValues.forEach((item, index)=>{
                        if (item.value != 0) {
                            this.util.appendToTemplate(history, "div", `
                            <div>
                            <p>Data: <span>${item.date}</span></p>
                            <p>Valor: <span>${this.util.formatPrice(item.value)}</span></p>
                            <p>Onde: <span>${item.where}</span></p>
                            </div>
                            <div>
                                <button type="button" id="${item.id}">
                                    <img src="assets/svg/delete.svg" alt="Apagar reserva" />
                                </button>
                            </div>
                            `, {"class":`history id-${item.id}`})
                        }
                
                    });
                });
            });

             
            
        })

        
    }
}

export default ClassDOM;