import Localbase from 'localbase';


let db = new Localbase('db')

//create Indexeddb database
export async function createLocaldb(data,dbName,num) {
    try {
        const response =  db.collection(dbName).add({
                id:num,
                data:data
              })
        return response.data
    } catch (error) {
        return error
    }
}

// set Indexeddb database
export async function setLocaldb(data,dbName,num) {
    try {
        const response =  db.collection(dbName).set({
                id:num,
                data:data
              })
        return response.data
    } catch (error) {
        return error
    }
}

// Update the Indexeddb database
export async function updateLocaldb(data,dbName,num) {
    try {
        const response =  db.collection(dbName).doc({ id: num }).update({
                id:num,
                data:data
              })
        return response.data
    } catch (error) {
        return error
    }
}

// get collection from the Indexeddb database
export async function getLocaldb(data,dbName,num) {
    try {
        const response = await db.collection(dbName).get()
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}

// deleted Local storage on the Indexeddb database
export async function deletedLocaldb() {
    try {
        db.delete()
        //db.collection('users').delete()
        return 'Database Deleted'
    } catch (error) {;
        return error
    }
}