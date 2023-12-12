const UserStorage = require('./userStorage')

class User {  
    constructor(body) {    
        this.body = body;
    }

    /**
     * userStorage에서 getItem을 불러와서 db에 접근
     */
    getItems = async() => {
        const data = await UserStorage.getItems();
        return data;
    }

    /**
     * userStorage에 addItem에 데이터를 보내서 db에 접근
     */
    setItems = async () => {
        const client = this.body;
        const data = await UserStorage.addItem(client);
    }

    /**
     * userStorage에 edditItem에 데이터를 보내서 db에 접근
     */
    editItems = async () => {
        const client = this.body;
        const data = await UserStorage.editItems(client);
    }

    /**
     * 업로드할 이미지의 이름, 업로드 날짜, 학번을 보낸다
     */
    uploadImg = async () => {
        const client = this.body;
        const data = await UserStorage.uploadImg(client);
    }

}

module.exports = User;