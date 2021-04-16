import Cropper from "cropperjs"
import Firebase from '../Firebase/Firebase';
import ClassFirebase from "./ClassFirebase";

class Profile
{
    constructor(uid)
    {
        this.uid = uid;
        this.firebase = Firebase;
    }

    changePhoto(file, html)
    {
        const image = new Image();


        const photoForm = html.querySelector("form.change_photo");

        const photoPreview = html.querySelector("form.change_photo img");

        const reader = new FileReader();

        reader.onload = ()=>{
            
            photoPreview.src = reader.result;

            //Recorte de Imagem
            photoForm.classList.add('cropping');
            cropper = new Cropper(image, {
                aspectRatio: 16 / 9,
    
              });

            cropper.destroy();
        }

        reader.readAsDataURL(file); 

        //Recorte de Imagem
        photoPreview.src = cropper.getCroppedCanvas().toDataURL("image/png");
        cropper.getCroppedCanvas().toBlob((blob)=>{
            const storage = firebase.storage();
            const fileRef = storage.ref().child(`photos/${this.uid}.png`);
            fileRef
            .put(blob)
            .then((snapshot)=>snapshot.ref.getDownloadURL())
            .then(photoURL => userGlobal.updateProfile({ photoURL }))
            .then(()=>{
                userGlobal.photoURL;
                document.querySelector("#header > div.menu.logged > div > div > picture > a > img").src = userGlobal.photoURL;
            });

            cropper.destroy();
        });
  
    }

    submitPhoto()
    {
      //Recorte de Imagem
      imageElement.src = cropper.getCroppedCanvas().toDataURL("image/png");
      cropper.getCroppedCanvas().toBlob((blob)=>{
          const storage = firebase.storage();
          const fileRef = storage.ref().child(`photos/${userGlobal.uid}.png`);
          fileRef
          .put(blob)
          .then((snapshot)=>snapshot.ref.getDownloadURL())
          .then(photoURL => userGlobal.updateProfile({ photoURL })) 
          .then(()=>{
              console.log(userGlobal)
              userGlobal.photoURL;
              document.querySelector("#header > div.menu.logged > div > div > picture > a > img").src = userGlobal.photoURL;
          });

          cropper.destroy();
      });
      const storage = this.firebase.storage();
      const fileRef = storage.ref().child(`photos/${this.uid}.png`);
      fileRef
            .put(blob)
            .then((snapshot)=>snapshot.ref.getDownloadURL())
            .then(photoURL => userGlobal.updateProfile({ photoURL })) 
            .then(()=>{
                console.log(userGlobal)
                userGlobal.photoURL;
            });
    }
}

export default Profile;