const firebase = require("../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

class UserStorage {
  constructor(body) {
    this.body = body;
  }

  static #addItem = async (data) => {
    const item = await firestoreDB.addDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data});
    console.log(item);
  }

  static #deleteItems = async () => {
    try {
      const today = new Date();
      const todayDate = today.getDate();
      const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db, 'AI-ROOM'));
  
      const deletions = [];
      dbItems.forEach((doc) => {
        const { date } = doc.data();
        console.log(date)
  
        if (date !== todayDate) {
          deletions.push(firestoreDB.deleteDoc(doc.ref));
        }
      });
  
    //   console.log(deletions);
      await Promise.all(deletions);
    } catch (err) {
      console.error('오류:', err);
    }
  }

  static #editItems = async (data) => {
    // date 받아오기
    // const item = await firestoreDB.updateDoc(firestoreDB.collection('AI-ROOM'), {...data})
  }

  static #getItems = async () => {
    const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db,'AI-ROOM'));
    dbItems.forEach((doc)=> {
        console.log(doc.data())
    })
  }

  static addItem = (data) => {
    data.forEach(element => {
      console.log(element);
      this.#addItem(element);
    });
    return { msg: "성공" };
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
