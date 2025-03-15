
export class User {

   _id:string;
   firstName: string;
   lastName: string;
   role: string[];



  constructor(_id:string,firstName:string,lastName: string,role: string[]) {
    this._id=_id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.role=role;

  }

}
export interface IUserCredentials {
  email : string;
  password: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'client'
}


export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
}




