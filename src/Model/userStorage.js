const firebase = require("../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

const storage = require("firebase/storage");

class UserStorage {
  constructor(body) {
    this.body = body;
  }
  
  static #addimg = async (data) => {
    const storageRef = storage.ref();
    const firestoredbImage = storage.child('image/');
    const imgupload = firestoredbImage.put(data.file);
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
    try {
      const { StudentID } = data;
      const dbItems = await this.#getItems();
  
      dbItems.forEach(async (doc) => {
        const { docStudentID } = doc.data();
        console.log(docStudentID);
  
        if (StudentID !== docStudentID) {
          await firestoreDB.updateDoc(doc.ref, { ...data });
          return;
        }
      });
    } catch (err) {
      console.error('오류:', err);
    }
  }
  

  static #getItems = async () => {
    const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db,'AI-ROOM'));
    return dbItems;
  }

  static addImg = (data) => {
    return this.#addimg(data);
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
