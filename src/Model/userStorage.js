const firebase = require("../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

class UserStorage{
    constructor(body) {    
        this.body = body;
    }

    static #addItem = async (data) => {

        // const item = await firestoreDB.addDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data})

    }

    static #deleteItems = async (date) => {
        // const item = await firestoreDB.deleteDoc(firestoreDB.collection(db, 'AI-ROOM'), {...date})
    }

    static #editItems =  async (data) => {
        //date 받아오기
        // const item = await firestoreDB.updateDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data})
    }

    static #getItems = () => {

    }

    static addItem = (data) => {
        // return this.#addItem(data);
    }

    static deleItem = async (data) => {
        // return this.#deleteItems(data);
    }

    static editItems = (data) => {
        // return this.#editItems(data);
    }

    static getItems = (date) => {
        // this.#deleteItems(date);
        // return this.#getItems();
    }
}

module.exports = UserStorage;