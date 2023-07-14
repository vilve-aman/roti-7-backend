import { db } from "./firestore.js"
import { doc, getDoc, setDoc, getDocs, collection, getCountFromServer } from "firebase/firestore";


let obj = {
    first: "Ada",
    last: "Lovelace",
    born: 1816
}
let tablename = "users"


const getDocument = async (collectionId, docId) => {

    const docRef = doc(db, collectionId, docId);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            return ({ "Document data": docSnap.data() })
        } else {
            // console.log("No such document!");
            throw ("No such document!")
        }

    }
    catch (error) {
        return (error)
    }

}





const addDocument = async (collectionId, docId, obj) => {

    const docRef = doc(db, collectionId, docId);


    try {
        await setDoc(docRef, obj);
        // console.log("Document written with ID: ", docRef.id)
        return ({ "Document written with ID": docRef.id })
    }
    catch (e) {
        // console.error("Error adding document: ", e);
        return ({ "Error adding document ": e })
    }

}




const updateDocument = async (collectionId, documentId, updatedObj) => {

    const docRef = doc(db, collectionId, documentId);

    try {
        await setDoc(docRef, updatedObj, { merge: true });
        // console.log("Document written with ID: ", docRef.id);
        return ({ "Document updated with ID": docRef.id })
    } catch (e) {
        // console.error("Error adding document: ", e);
        return ({ "Error adding document: ": e })
    }

}


const getAllDocuments = async (collectionId) => {

    // const db = 'roti-drivers'
    const collRef = collection(db, collectionId)

    const querySnapshot = await getDocs(collRef);

    let docList = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        docList.push({ 'docId': doc.id, 'docData': doc.data() })
    });
    // console.log(docList)
    return docList
}




const getDocumentCount = async (collectionId) => {

    const collectionRef = collection(db, collectionId);



    try {
        const snapshot = await getCountFromServer(collectionRef);
        console.log(snapshot.data().count);
        return(snapshot.data().count)
    }
    catch (error) {
        console.log(error)
        return (error)
    }

}


// await addDocument(tablename, 'sdcbmno', obj)
// await getDocument("runlogs", "9cd42445")
// await updateDocument("users", "J4A578kjZJQ1KatYEkgK", {
    //     first: "Avinash",
    //     last: "Lovelace",
    //     born: 12000
    // })
// await getDocumentCount('locationV2')
    

// console.log(await getAllDocuments('users'))

export { addDocument, updateDocument, getDocument, getAllDocuments, getDocumentCount }