export function getFormValues(form)
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

export function errorHandler(error)
{
    switch(error){
        case 'auth/user-not-found':
            return 'Não foi possível encontrar o e-mail ou usuário informado';
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

export function showAlert(section, type, message)
{
    const alertBox = document.querySelector(`section.${section} .alert`);
    alertBox.classList.add(type);
    alertBox.innerHTML = message;

}

export function hideAlert(section, type)
{
    const alertBox = document.querySelector(`section.${section} .alert`);
    alertBox.classList.remove(type);
    alertBox.innerHTML = '';
}

export function getRandom()
{
    let random = Math.floor(Math.random() * 50000) + 1000
    return random.toString();
}

export function appendToTemplate(element, tagName, html, attr = null) {
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

export function menuHandler(menu)
{
    menu.classList.toggle('open');
}

export function formatPrice(value) 
{
    return parseFloat(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
}

export function getToday()
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

export function addOpen()
{
    if (window.innerWidth >= 768) {
        document.querySelectorAll("details").forEach((tag)=>{
            tag.setAttribute('open', 'open');
        });
    }
}

export function clearAllInputs()
{
    document.querySelectorAll("input").forEach((input)=>{
        input.value = '';
    })
}