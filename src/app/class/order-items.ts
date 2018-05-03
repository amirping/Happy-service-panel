export class OrderItems {
    private menu_item: String;
    private number: Number;
    private extra: String;
    private queryId: String;
    private message: String;

    constructor(menu_item: String, number: Number, extra: String, queryId: String, message: String) {
        this.extra = extra;
        this.menu_item = menu_item;
        this.message = message;
        this.queryId = queryId;
        this.number = number;
    }

    /**
     * Getter $menu_item
     * @return {String}
     */
    public get $menu_item(): String {
        return this.menu_item;
    }

    /**
     * Getter $number
     * @return {Number}
     */
    public get $number(): Number {
        return this.number;
    }

    /**
     * Getter $extra
     * @return {String}
     */
    public get $extra(): String {
        return this.extra;
    }

    /**
     * Getter $queryId
     * @return {String}
     */
    public get $queryId(): String {
        return this.queryId;
    }

    /**
     * Getter $message
     * @return {String}
     */
    public get $message(): String {
        return this.message;
    }

    /**
     * Setter $menu_item
     * @param {String} value
     */
    public set $menu_item(value: String) {
        this.menu_item = value;
    }

    /**
     * Setter $number
     * @param {Number} value
     */
    public set $number(value: Number) {
        this.number = value;
    }

    /**
     * Setter $extra
     * @param {String} value
     */
    public set $extra(value: String) {
        this.extra = value;
    }

    /**
     * Setter $queryId
     * @param {String} value
     */
    public set $queryId(value: String) {
        this.queryId = value;
    }

    /**
     * Setter $message
     * @param {String} value
     */
    public set $message(value: String) {
        this.message = value;
    }

}
