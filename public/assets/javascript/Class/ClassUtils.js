class Utils
{
    getFormValues(form)
    {
        const values = {};

        form.querySelectorAll("[name]").forEach((field)=>{
            switch (field.type) {
                case "select":
                    values[field.name] = field.querySelector("option:selected")?.value
                    break
                case "radio":
                    values[field.name] = form.querySelector(`[name=${field.name}]:checked`)?.value
                    break 
                case "checkbox":
                    values[field.name] = []
                    form.querySelectorAll(`[name=${field.name}]:checked`).forEach(checkbox => {
                        values[field.name].push(checkbox.value)
                    })    
                    break
                default:
                    values[field.name] = field.value
                    break
            }
        });

        return values;
    }

    errorHandler(error)
    {
        switch(error){
            case 'auth/user-not-found':
                return 'Não foi possível encontrar o e-mail informado';
            break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Não foi possível acessar: E-mail ou senha inválidos';
            break;
            case 'auth/email-already-in-use':
                return "Este e-mail já está cadastrado. Tente acessar sua conta ou&nbsp; <a href='#forget'> recupere sua senha</a>"
            break;
        }
    }

    showAlert(section, type, message)
    {
        const alertBox = document.querySelector(`section.${section} .alert`);
        alertBox.classList.add(type);
        alertBox.innerHTML = message;

    }

    hideAlert(section, type)
    {
        const alertBox = document.querySelector(`section.${section} .alert`);
        alertBox.classList.remove(type);
        alertBox.innerHTML = '';
    }

    getRandom()
    {
        let random = Math.floor(Math.random() * 50000) + 1000
        return random.toString();
    }

    appendToTemplate(element, tagName, html, attr = null) {
        const wrapElement = document.createElement(tagName)

        if (attr) {
            for(let item in attr) {
                wrapElement.setAttribute(item, attr[item])
            }
        }
        
        wrapElement.innerHTML = html
        
        element.append(wrapElement)
        
        return wrapElement
    }

    menuHandler(menu)
    {
        menu.classList.toggle('open');
    }

    formatPrice(value) 
    {
        return parseFloat(value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    getToday()
    {
        const date = new Date();
        const day = date.getDate();
        let month;
        switch(date.getMonth()) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                month = `0${eval(date.getMonth()+1)}`;
            break;
            default:
                month = eval(date.getMonth()+1);
            break;
        }
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    changeSection(hash)
    {
        document.querySelectorAll("#app section").forEach((tag)=>{
            tag.classList.remove("show");
        })
        switch(hash)
        {
            default:
                document.querySelector("#vaults").classList.add("show")
                this.addOpen();
            break;
            case '#new':
                document.querySelector("#new_vault").classList.add("show")
                this.clearAllInputs();
            break;
            case '#edit_vault':
                document.querySelector("#edit_vault").classList.add("show")
                this.clearAllInputs();
            break;
            case "#profile":
                document.querySelector("#profile").classList.add("show")
            break;
        }
    }

    addOpen()
    {
        if (window.innerWidth >= 768) {
            document.querySelectorAll("details").forEach((tag)=>{
                tag.setAttribute('open', 'open');
            });
        }
    }

    clearAllInputs()
    {
        document.querySelectorAll("input").forEach((input)=>{
            input.value = '';
        })
    }


}

export default Utils;