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

}

module.exports = User;