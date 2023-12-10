const firebase = require("../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

const storage = require("firebase/storage");

class UserStorage {
  constructor(body) {
    this.body = body;
  }
  /**
   * 
   * @param {*} data 뭐기 들어가여
   * 이런 기능을 합니다
   */
  static #addimg = async (data) => {
    const storageRef = storage.ref();
    const firestoredbImage = storage.child('image/');
    const imgupload = firestoredbImage.put(data.file);
  }

  /**
   * 
   * @param {*} data 들어온 정보를 직접 DB에 ADD 시키는 private function
   */
  static #addItem = async (data) => {
    const item = await firestoreDB.addDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data});
    console.log(item);
    console.log("private 부분")
  }

  /**
   * 오늘의 날짜를 구해서 오늘 날짜와 맞지 않다면 삭제시키는 private function
   */
  static #deleteItems = async () => {
    try {
      const today = new Date();
      const todayDate = today.getDate();
      const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db, 'AI-ROOM'));
  
      const deletions = [];
      dbItems.forEach((doc) => {
        const { date } = doc.data();
        console.log(date)
        console.log(todayDate);
  
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

  /**
   * @param {*} data data를 받고 학번을 추출한 다음 getItems로 모든 현재 DB에 있는 정보를 가져와 비교하고 학번이 맞다면 변경하는 private function
   */
  static #editItems = async (data) => {
    try {
      const { editID } = data;
      const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db, 'AI-ROOM'));
  
      dbItems.forEach(async (doc) => {
        const { StudentID } = doc.data();
        console.log(StudentID);
  
        if (editID !== StudentID) {
          await firestoreDB.updateDoc(doc.ref, { ...data });
          return;
        }
      });
    } catch (err) {
      console.error('오류:', err);
    }
  }
  
  /**
   * DB에 있는 모든 정보를 반환하는 private function
   */
  static #getItems = async () => {
    try {
        const dbItems = await firestoreDB.getDocs(firestoreDB.collection(db,'AI-ROOM'));
        const itemsArray = dbItems.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
  
        console.log("Work");
        console.log(itemsArray);
  
        return itemsArray;
    } catch (err) {
        console.error('오류:', err);
        return []; // 오류 시 빈 배열 반환 또는 다른 적절한 처리
    }
}

  static addImg = (data) => {
    return this.#addimg(data);
  }

  /**
   * 
   * @param {*} data 현재 등록하려는 모든 유저의 데이터를 받아서 foreach로 돌려서 private 부분 전달
   * @returns 성공했다는 메세지 반환 예정
   */
  static addItem = (data) => {
    console.log("싱ㄹ행");
    data.forEach(element => {
      console.log(element);
      this.#addItem(element);
    });
    return { msg: "성공" };
  }
  /**
   * 
   * @param {*} data edit 하혀는 아이디, 끝나는 시간, 현재 끝나는지 private으로 보냄ㄴ
   * @returns 
   */
  static editItems = (data) => {
    return this.#editItems(data);
  }

  /**
   * 
   * @returns get 요청을 받으면 어제 있던 data를 지우고 오늘 있던 data를 가져와서 반환함
   */
  static getItems = () => {
    this.#deleteItems();
    return this.#getItems();
  }
}

module.exports = UserStorage;
