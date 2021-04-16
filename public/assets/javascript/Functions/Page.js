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
        window.location.hash = "#home";
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

    const navLinks = page.querySelectorAll("nav a");
    if (navLinks) {
        navLinks.forEach((a)=>{
            a.addEventListener("click",()=>{
                utils.menuHandler(page.querySelector("nav"));
            })
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
                const zipcodeElement = profileSec.querySelector("input[name=zipcode]")
                const birthdayElement = profileSec.querySelector("input[name=birthday]")
                if (zipcodeElement) {
                    new IMask(zipcodeElement, {
                        mask: '00.000-000'
                    });
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
                const inputFileElement = profileSec.querySelector("#file");
                const formElement = profileSec.querySelector("form");
                const btnSubmit = profileSec.querySelector("footer button[type=submit]");

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

                    btnSubmit.innerHTML = `					<img src="assets/svg/save.svg" alt="Salvar perfil" />
					<span>&nbsp;salvar perfil</span>`
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