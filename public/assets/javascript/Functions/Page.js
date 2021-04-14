import Login from '../Class/ClassLogin';
import ClassFirebase from '../Class/ClassFirebase';
import Utils from '../Class/ClassUtils';
import ClassDOM from '../Class/ClassDOM';

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



        } else {
            window.location.href = "/login.html";
        }
        
    })


})