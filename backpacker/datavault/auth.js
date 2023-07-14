import { auth } from "./firestore.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

const userlogin = async (email, password) => {
    // let email = "hi@123.com"
    // let password = "123456"

    return new Promise((resolve, reject) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user)
                // return user
                resolve(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                reject(errorCode, errorMessage)
            });

    })





}


const userlogout = () => {

    return new Promise((resolve, reject) => {

        signOut(auth).then(() => {
            resolve("Sign-out successful.")
        }).catch((error) => {
            reject("An error happened.")
        });

    })
}




const userSignup = (email, password) => {
    // let email = "hi@123.com"
    // let password = "123456"

    return new Promise((resolve, reject) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
                resolve(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                reject(errorCode, errorMessage)
            });

    })
}

export { userlogin, userlogout, userSignup }