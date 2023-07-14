// Image storage database
import { v4 as uuidv4 } from 'uuid';
import { storage, auth } from "./firestore.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";




// Create a storage reference from our storage service
const storageRef = ref(storage);



const getImageUrl = (refrence) => {

    return new Promise((resolve, reject) => {
        getDownloadURL(refrence)
            .then((url) => {
                // console.log("uploaded image url is :", url)
                resolve({ "uploaded image url ": url })
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
    })

}

const uploadImage = (blob) => {
    // console.log(blob)

    return new Promise((resolve, reject) => {
        // create a refrence first
        const spaceRef = ref(storageRef, `${process.env.DELIVERY_IMAGES_PATH}${uuidv4()}.webp`);
        // write to storage
        uploadBytes(spaceRef, blob)
            .then(async (snapshot) => {
                console.log('Uploaded a blob or file!');

                // retrieveUrl
                const url = await getImageUrl(spaceRef)
                resolve(url)
            })
            .catch((err) => reject(err))
    })

}

const adminUpload = (payload) => {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // console.log(userCredential.user)
                const url = await uploadImage(payload)
                resolve(url)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                reject(errorCode, errorMessage)
            });
    })


}

// uploadImage(img)
// adminUpload(img)    // tested successfully

export { adminUpload }



