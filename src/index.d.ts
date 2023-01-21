
//define a type for Express.User
declare global {
    namespace Express  {
        interface User {
            username: string;
        }
    }
}

export {};
