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
                return 'Não foi possível encontrar o e-mail ou usuário informado';
            break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Não foi possível acessar: E-mail ou senha inválidos';
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

}

export default Utils;