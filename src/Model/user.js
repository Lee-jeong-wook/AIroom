const UserStorage = require('./userStorage')

class User {  
    constructor(body) {    
        this.body = body;
    }

    getItems = async() => {
        const today = new Date();
        const date = today.getDate();
        const data = await UserStorage.getItems(date);
    }

    setItems = async () => {
        const client = this.body;
        const data = await UserStorage.addItem(client);
    }

    editItems = async () => {
        const client = this.body;
        const data = await UserStorage.editItems(client);
    }

}

module.exports = User;