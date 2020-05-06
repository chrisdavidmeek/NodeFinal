const dbService = require('../services/db');

class User {
    constructor(userData){
        this.firstName /*property declaration in constructor */ = userData.name.givenName; //data taken from req.user
        this.lastName = userData.name.familyName;
    }

    static async addUser(userData){
        //used to add user to database with data passed (in this case you could use req.user)
        //connect to database, execute functionality

        const newUser = await dbService.db.collection('users').insertOne(userData); //adds user with all information taken from req.user
        return newUser; //terminates function, completes transaction
    }

    static async checkUserExists(userID){
        const result = await dbService.db.collection('users').find({id: userID}).toArray(); //find specific user, add to array
        if(result.length > 0){
            console.log('user already exists');
            return true;
        }
        else {
            return false;
        }
    }


};

module.exports = User; 