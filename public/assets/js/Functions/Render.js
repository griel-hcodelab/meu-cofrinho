import { insertValue, select, deleteHistory } from "./Database";
import { addOpen, appendToTemplate, clearAllInputs, formatPrice, getFormValues, menuHandler } from "./Utils"

export function renderVaults(vault, vaultValues)
{

    const vaults = document.querySelector("section#vaults div.contents")

    vaults.innerHTML = '';
    vault.forEach((item)=>{

        let sum = [];
        let vaulted;
        vaultValues.forEach(item=>{
            sum.push(parseFloat(item.value))
        })
        
        let result = ()=>{
            const calc = sum.reduce((item, total)=>{
                return item+total
            })

            if (typeof calc == "string") {
                vaulted = "R$0,00"
            } else {
                vaulted = formatPrice(calc);
            }
        }
        result();
        

        appendToTemplate(vaults, 'details', `
            <summary>${item.vault_identify}</summary>
            <p>Necessário: <strong>${formatPrice(item.vault_value)}</strong></p>
            <p>Você tem: <strong>${vaulted}</strong></p>
            <a id="${item.vault_id}">
                <img src="assets/svg/edit.svg" alt="Editar ${item.vault_identify}" />
                editar seu cofrinho
            </a>
        `)

        vaults.querySelectorAll("details a").forEach((link)=>{
            link.addEventListener("click",(e)=>{

                select(e.target.id)
            })
        });
    })
    addOpen();
    
}

export function renderVault(data, values)
{

    const section = document.querySelector("section#edit_vault");
    section.innerHTML = '';

    let sum = [];
    values.forEach(item=>{
        sum.push(parseFloat(item.value))
    });
    const vaulted = sum.reduce((item, total)=>{
        return item+total
    });

    appendToTemplate(section, "header", `
        <h2>${data.vault_identify}</h2>
    `);

    appendToTemplate(section, "div", `
    <h3>${data.vault_description}</h3>
    <div class="values">
        <div class="value">
            <p>Valor:</p>
            <strong contenteditable="true">${formatPrice(data.vault_value)}</strong>
        </div>
        <div class="value">
            <p>Guardado: </p><strong>${formatPrice(vaulted)}</strong>
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
    values.forEach((item, index)=>{
        if (item.value != 0) {
            appendToTemplate(history, "div", `
            <div>
            <p>Data: <span>06/04/2021</span></p>
            <p>Valor: <span>${formatPrice(item.value)}</span></p>
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

    appendToTemplate(section, "footer", `
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
            <form id="${data.vault_id}">
                <p>adicionar uma quantia</p>
                <div class="fields">
                    <div class="field">
                        <label for="vault_add_cash">Quanto você vai adicionar?</label>
                        <input type="text" name="vault_add_cash" id="vault_add_cash" placeholder="Digite o valor" required />
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


    window.location.hash = "#edit_vault";

    const addValueDiv = section.querySelector("footer .add_values");
    const addValueBtn = section.querySelector("footer .buttons button");
    const addValueCancel = section.querySelector("footer div.add_values .buttons button[type=button]");
    if (addValueBtn && addValueDiv && addValueCancel) {
        addValueBtn.addEventListener("click",()=>{
            
            menuHandler(addValueDiv);
        })
        addValueCancel.addEventListener("click",()=>{

            menuHandler(addValueDiv);
        })

        addValueDiv.addEventListener("submit", (e)=>{
            e.preventDefault();

            const form = section.querySelector("footer .add_values form");

            insertValue(data.vault_id, getFormValues(form));

        });
    }

    const deleteHistoryBtn = document.querySelectorAll("div#history button");
    deleteHistoryBtn.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault();

            deleteHistory(data.vault_id, btn.id)
        });
    })

    sum = [];    
}



export function changeSection(hash)
{
    document.querySelectorAll("#app section").forEach((tag)=>{
        tag.classList.remove("show");
    })
    switch(hash)
    {
        default:
            document.querySelector("#vaults").classList.add("show")
            addOpen();
        break;
        case '#new':
            document.querySelector("#new_vault").classList.add("show")
            clearAllInputs();
        break;
        case '#edit_vault':
            document.querySelector("#edit_vault").classList.add("show")
            clearAllInputs();
        break;
    }
}

