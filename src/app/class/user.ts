export class User {
  private id: string
  private pseudo: string
  private name: string
  private last_name: string
  private password: string
  private resto_name:string

  constructor(id: string , pseudo: string, name: string, last_name: string, resto_name: string) {
        this.id = id;
        this.pseudo = pseudo;
        this.name = name ;
        this.last_name = last_name;
        this.resto_name = resto_name;
  }
/*   public update_personal(name : string , last_name :string , resto_name: string){
    // call the service here
  }
  public update_security(old_password:string , new_password : string){
    // call the service here
  } */

}
