const firebase = require("../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

class UserStorage {
  constructor(body) {
    this.body = body;
  }

  static #addItem = async (data) => {
    const item = await firestoreDB.addDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data});
  }

  static #deleteItems = async () => {
    try {
      const today = new Date();
      const todayDate = today.getDate();
      console.log('hi')
      console.log(firestoreDB.collection(db, 'AI-ROOM'));
      const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db, 'AI-ROOM'));

      const deletions = [];
      dbItems.forEach((doc) => {
        const { date } = doc.data();

        if (date !== todayDate) {
          deletions.push(doc.ref.delete());
        }
      });
      console.log(deletions);
      await Promise.all(deletions);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  static #editItems = async (data) => {
    // date 받아오기
    // const item = await firestoreDB.updateDoc(firestoreDB.collection('AI-ROOM'), {...data})
  }

  static #getItems = async () => {
    const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db,'AI-ROOM'));
  }

  static addItem = (data) => {
    data.forEach(element => {
      console.log(element);
      this.#addItem(element);
    });
    return { msg: "성공" };
  }

  static deleteItem = async (data) => {
    return this.#deleteItems(data);
  }

  static editItems = (data) => {
    return this.#editItems(data);
  }

  static getItems = () => {
    this.#deleteItems();
    return this.#getItems();
  }
}

module.exports = UserStorage;
