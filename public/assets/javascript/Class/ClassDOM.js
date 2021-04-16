import Utils from './ClassUtils';
import ClassFirebase from './ClassFirebase';

class ClassDOM
{
    constructor(uid, vaultsData)
    {
        this.uid = uid;
        this.util = new Utils();
        this.db = new ClassFirebase();
        this.vaults = vaultsData;
    }

    updateEditLinks(id)
    {

        document.querySelector(`details a#id${id}`).addEventListener("click", (e)=>{
            this.renderVault(id)
        })
    }

    renderVaults()
    {

        const vaultsTag = document.querySelector("section#vaults div.contents")

        vaultsTag.innerHTML = '';


        this.vaults.forEach((item)=>{

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
                `, {
                    "id":'item'+item.vault_id
                })

                this.updateEditLinks(item.vault_id)

                this.util.addOpen()
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
                        <button type="button"><img src="assets/svg/delete.svg" alt="Apagar cofre" /></button>
                    `);

                    

                    this.util.appendToTemplate(section, "div", `
                    <h3>${vault.vault_description}</h3>
                    <div class="values">
                        <div class="value">
                            <p>Valor:</p>
                            <strong>${this.util.formatPrice(vault.vault_value)}</strong>
                        </div>
                        <div class="value">
                            <p>Guardado: </p><strong class="vaulted">${vaulted}</strong>
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
                            <p>Valor: <span class="value_history">${this.util.formatPrice(item.value)}</span></p>
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

                    this.util.appendToTemplate(section, "footer", `
                        <div class="buttons">
                            <a href="#">
                                <img src="assets/svg/back.svg" alt="Voltar" />
                                <span>voltar</span>
                            </a>
                            <button type="button">
                                <img src="assets/svg/add_value.svg" alt="Adicionar Valor" />
                                adicionar valor
                            </button>
                        </div>
                        <div class="add_values">
                            <form id="${id}">
                                <p>adicionar uma quantia</p>
                                <div class="fields">
                                    <div class="field">
                                        <label for="vault_add_cash">Quanto você vai adicionar?</label>
                                        <input type="number" name="vault_add_cash" id="vault_add_cash" placeholder="Digite o valor" required />
                                    </div>
                                    <div class="field">
                                        <label for="vault_add_local">Onde está o dinheiro?</label>
                                        <input type="text" name="vault_add_local" id="vault_add_local" placeholder="Banco, Carteira, Gaveta" required />
                                    </div>
                                </div>
                                <div class="buttons">
                                    <button type="button">
                                        <img src="assets/svg/down.svg" alt="Cancelar" />
                                        <span>cancelar</span>
                                    </button>
                                    <button type="submit">
                                        <img src="assets/svg/save.svg" alt="Salvar" />
                                        salvar
                                    </button>
                                </div>
                            </form>
                        </div>`
                    );
                });
                window.location.hash = "#edit_vault";

                const backLink = section.querySelector("footer .buttons a");
                const addValueDiv = section.querySelector("footer .add_values");
                const addValueBtns = section.querySelector("footer .buttons button");
                const addValueCancel = section.querySelector("footer div.add_values .buttons button[type=button]");
                if (addValueBtns && addValueDiv && addValueCancel) {
                    addValueBtns.addEventListener("click",()=>{
                        
                        this.util.menuHandler(addValueDiv);
                        
                    })
                    addValueCancel.addEventListener("click",()=>{
            
                        this.util.menuHandler(addValueDiv);
                    })
                    addValueDiv.addEventListener("submit", (e)=>{
                        e.preventDefault();
            
                        const form = section.querySelector("footer .add_values form");
            
                        this.db.insertValue(id, this.uid, this.util.getFormValues(form));

                        this.renderVault(id)
            
                    });

                    backLink.addEventListener("click", (e)=>{
                        e.preventDefault();
                        this.renderVaults()
                        window.location.hash = "#";
                    })

                    
                }

                const deleteVaultBtn = document.querySelector("#edit_vault > header > button");
                if (deleteVaultBtn) {
                    deleteVaultBtn.addEventListener("click", (e)=>{

                        this.db.delete(id, this.uid)

                        document.querySelector(`#item${id}`).remove();

                        window.location.hash = "#";

                        
                    })
                }

                const deleteHistoryBtn = document.querySelectorAll("div#history button");
                deleteHistoryBtn.forEach((btn)=>{
                    btn.addEventListener("click", (e)=>{
                        e.preventDefault();
            
                        this.db.deleteHistory(id, this.uid, btn.id)

                        this.renderVaults()
                        
                    });
                })
            });

             
            
        })

        
    }
}

export default ClassDOM;