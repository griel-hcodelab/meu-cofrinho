import Login from '../Class/ClassLogin';
import ClassFirebase from '../Class/ClassFirebase';
import Utils from '../Class/ClassUtils';
import ClassDOM from '../Class/ClassDOM';
import IMask from 'imask';
import Cropper from "cropperjs";

document.querySelectorAll("#app").forEach((page)=>{

    const login = new Login();
    const db = new ClassFirebase();
    const utils = new Utils();

    window.addEventListener("load", ()=>{
        utils.changeSection(window.location.hash);
        utils.addOpen();
    });
    window.addEventListener("hashchange", ()=>{
        utils.changeSection(window.location.hash);
        utils.addOpen();
    });

    const logo = page.querySelector("header div.logo");
    logo.addEventListener("click", (e)=>{
        window.location.hash = "#";
    })
    const meuBtn = page.querySelector("header button");
    meuBtn.addEventListener("click", (e)=>{
        utils.menuHandler(page.querySelector("nav"))
    })

    const signout = page.querySelector("header nav .links a#signout");
    if (signout) {
        signout.addEventListener("click", (e)=>{
            e.preventDefault();
            login.signout();
        })
    }



    login.getLoginData().onAuthStateChanged((user)=>{
        if (user) {

            const profileUserName = page.querySelector("header nav div.profile strong");
            profileUserName.innerHTML = user.displayName;
            const profileUserPhoto = page.querySelector("header nav div.profile img");
            profileUserPhoto.src = user.photoURL || "assets/img/blank-profile.png";

            //Consultando os cofres
            db.data().collection(`vaults/${user.uid}/vault`).onSnapshot(snapshot => {
                const vaults = []
                snapshot.forEach(item => {
                    vaults.push(item.data());
                    
                })
                if (vaults.length >= 1) {
                    const dom = new ClassDOM(user.uid, vaults);
                    dom.renderVaults()


                }

            });

            const newVault = page.querySelector("section#new_vault");
            if (newVault) {

                newVault.querySelector("form").addEventListener("submit", (e)=>{
                    e.preventDefault();

                    const values = utils.getFormValues(e.target)

                    db.insert(values, user.uid)
                    window.location.hash = "#home";
                })


            }

            const profileSec = page.querySelector("section#profile");

            if (profileSec) {

                const formElement = profileSec.querySelector("form");
                const zipcodeElement = formElement.querySelector("input[name=zipcode]");
                const addressElement = formElement.querySelector("input[name=address]");
                const districtElement = formElement.querySelector("input[name=district]");
                const cityElement = formElement.querySelector("input[name=city]");
                const stateElement = formElement.querySelector("input[name=state]");
                const birthdayElement = formElement.querySelector("input[name=birthday]");
                const inputFileElement = formElement.querySelector("#file");
                const btnSubmit = profileSec.querySelector("footer button[type=submit]");


                if (zipcodeElement) {
                    new IMask(zipcodeElement, {
                        mask: '00.000-000'
                    });

                    zipcodeElement.addEventListener("blur", (e)=>{

                        const inputs = [addressElement, districtElement, cityElement, stateElement];
                        inputs.forEach(input=>{
                            input.parentElement.classList.add('loading');
                        })

                        let search = zipcodeElement.value.replace("-","").replace(".","");
                        const options = {
                            method: 'GET',
                            mode: 'cors',
                            cache: 'default'
                        }
                    
                        fetch(`https://viacep.com.br/ws/${search}/json/`, options)
                        .then(response =>{ response.json()
                            .then((json) => {
                                if (!json.data) {
                                    addressElement.focus()
                                }
                                let logradouro = null;
                                let bairro = null;
                                let cidade = null;
                                let estado = null;
                                if (json.logradouro) {
                                    logradouro = json.logradouro;
                                } else {
                                    addressElement.focus();
                                }
                                if (json.bairro) {
                                    bairro = json.bairro;
                                }
                                if (json.localidade) {
                                    cidade = json.localidade;
                                }
                                switch (json.uf) {
                                    case "AC":
                                        estado = "Acre";
                                        break;
                                    case "AL":
                                        estado = "Alagoas";
                                        break;
                                    case "AP":
                                        estado = "Amapá";
                                        break;
                                    case "AM":
                                        estado = "Amazonas";
                                        break;
                                    case "BA":
                                        estado = "Bahia";
                                        break;
                                    case "CE":
                                        estado = "Ceará";
                                        break;
                                    case "DF":
                                        estado = "Distrito Federal";
                                        break;
                                    case "ES":
                                        estado = "Espírito Santo";
                                        break;
                                    case "GO":
                                        estado = "Goiás";
                                        break;
                                    case "MA":
                                        estado = "Maranhão";
                                        break;
                                    case "MT":
                                        estado = "Mato Grosso";
                                        break;
                                    case "MS":
                                        estado = "Mato Grosso do Sul";
                                        break;
                                    case "MG":
                                        estado = "Minas Gerais";
                                        break;
                                    case "PA":
                                        estado = "Pará";
                                        break;
                                    case "PB":
                                        estado = "Paraíba";
                                        break;
                                    case "PR":
                                        estado = "Paraná";
                                        break;
                                    case "PE":
                                        estado = "Pernambuco";
                                        break;
                                    case "PI":
                                        estado = "Piauí";
                                        break;
                                    case "RJ":
                                        estado = "Rio de Janeiro";
                                        break;
                                    case "RN":
                                        estado = "Rio Grande do Norte";
                                        break;
                                    case "RS":
                                        estado = "Rio Grande do Sul";
                                        break;
                                    case "RO":
                                        estado = "Rondônia";
                                        break;
                                    case "RR":
                                        estado = "Roraima";
                                        break;
                                    case "SC":
                                        estado = "Santa Catarina";
                                        break;
                                    case "SP":
                                        estado = "São Paulo";
                                        break;
                                    case "SE":
                                        estado = "Sergipe";
                                        break;
                                    case "TO":
                                        estado = "Tocantins";
                                        break;
                                }
                                utils.setFormValues(formElement, {
                                    address: logradouro,
                                    district: bairro,
                                    city: cidade,
                                    state: estado,
                                })
                                inputs.forEach(input=>{
                                    input.parentElement.classList.remove('loading');
                                })
                            })
                        })
                        .catch((e) => {
                            console.error(e)
                        })
                    })
                }
                if (birthdayElement) {
                    new IMask(birthdayElement, {
                        mask: '00/00/0000'
                    });
                }

                let cropper;
                const imageElement = profileSec.querySelector("#photo-preview");
                imageElement.src = user.photoURL || "assets/img/blank-profile.png";
                const btnChoosePhoto = profileSec.querySelector(".choose-photo");


                imageElement.addEventListener("click", (e)=>{
                    inputFileElement.click();
                })
                btnChoosePhoto.addEventListener("click", (e)=>{
                    inputFileElement.click();
                })

                inputFileElement.addEventListener("change", (e)=>{

                    const file = e.target.files[0];

                    const reader = new FileReader();

                    reader.onload = ()=>{


                        imageElement.src = reader.result;
                        imageElement.style.borderRadius = 0;

                        cropper = new Cropper(imageElement, {
                            aspectRatio: 1 / 1,
                            viewMode: 2,
                            movable: false,
                            zoomable: false,
                        })

                        btnChoosePhoto.innerHTML = "Escolher Outra Foto";

                    }

                    reader.readAsDataURL(file);

                    e.target.value = '';
                })

                formElement.addEventListener("submit", (e)=>{
                    e.preventDefault();

                    formElement.classList.remove('cropping');

                    btnSubmit.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>`;


                    if (cropper) {

                        imageElement.src = cropper.getCroppedCanvas().toDataURL("image/png");
                        

                        cropper.getCroppedCanvas().toBlob((blob)=>{

                            const storage = db.getStorage();

                            const fileRef = storage.ref().child(`profile/photos/${user.uid}`);
        
                            fileRef
                            .put(blob)
                            .then(snapshot => snapshot.ref.getDownloadURL())
                            .then(photoURL => user.updateProfile({ photoURL }));
                            

                            cropper.destroy();

                        });

                    }

                    


                    db.updateProfile(user.uid, utils.getFormValues(formElement))

                    btnSubmit.innerHTML = `<img src="assets/svg/save.svg" alt="Salvar perfil" />
					<span>&nbsp;salvar perfil</span>`;

                    window.location.hash = "#";
                })

                db.data().collection('profile').doc(user.uid).get()
                .then((doc)=>{
    
                    let profile = doc.data();

                    utils.setFormValues(formElement, profile)
    
                });

                
                
                
                

            }



        } else {
            window.location.href = "/login.html";
        }
        
    })

    

    



    



})