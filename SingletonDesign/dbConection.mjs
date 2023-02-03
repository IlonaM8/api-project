class DBConnection {
    static instance;

    constructor(){
        if(DBConnection.instance){
            return DBConnection.instance;
        }

        this.connect();
        DBConnection.instance = this;
    }

    connect(){
        console.log("Connection to database...");
    }

    query(sql){
        console.log(`Executiong SQL: ${sql}`);
    }
}


export const dbConnecctionInstance = new DBConnection();

//a single instance of the class is exported as dbConnectionInstance from the module
//this ensure that only ONE instance of the class can be created and used throughout the application.
