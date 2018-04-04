export class User {
  private id: string;
  private pseudo: string;
  private name: string;
  private last_name: string;
  private password: string;
  private resto_name: string;
  constructor(id: string, pseudo: string, name: string, last_name: string, resto_name: string) {
    this.id = id;
    this.pseudo = pseudo;
    this.name = name;
    this.last_name = last_name;
    this.resto_name = resto_name;
  }

    /**
     * Getter $id
     * @return {string}
     */
public get $id(): string {
return this.id;
}

    /**
     * Setter $id
     * @param {string} value
     */
public set $id(value: string) {
this.id = value;
}
    /**
     * Getter $pseudo
     * @return {string}
     */
public get $pseudo(): string {
return this.pseudo;
}

    /**
     * Getter $name
     * @return {string}
     */
public get $name(): string {
return this.name;
}

    /**
     * Getter $last_name
     * @return {string}
     */
public get $last_name(): string {
return this.last_name;
}

    /**
     * Getter $password
     * @return {string}
     */
public get $password(): string {
return this.password;
}

    /**
     * Getter $resto_name
     * @return {string}
     */
public get $resto_name(): string {
return this.resto_name;
}

    /**
     * Setter $pseudo
     * @param {string} value
     */
public set $pseudo(value: string) {
this.pseudo = value;
}

    /**
     * Setter $name
     * @param {string} value
     */
public set $name(value: string) {
this.name = value;
}

    /**
     * Setter $last_name
     * @param {string} value
     */
public set $last_name(value: string) {
this.last_name = value;
}

    /**
     * Setter $password
     * @param {string} value
     */
public set $password(value: string) {
this.password = value;
}

    /**
     * Setter $resto_name
     * @param {string} value
     */
public set $resto_name(value: string) {
this.resto_name = value;
}
}
