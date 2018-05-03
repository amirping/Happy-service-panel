import { OrderItems } from './order-items';
export class Order {
    private user: any;
    private orderId: String;
    private orderStat: Number;
    private order_items: Array<OrderItems>;
    private order_timestamp: Number;

    constructor(user: any, orderId: String, orderStat: Number, order_items: Array<OrderItems>, timestamp: Number) {
        this.user = user;
        this.orderId = orderId;
        this.orderStat = orderStat;
        this.order_items = order_items;
        this.order_timestamp = timestamp;
    }

    /**
     * Getter $user
     * @return {any}
     */
    public get $user(): any {
        return this.user;
    }

    /**
     * Getter $orderId
     * @return {String}
     */
    public get $orderId(): String {
        return this.orderId;
    }

    /**
     * Getter $orderStat
     * @return {Number}
     */
    public get $orderStat(): Number {
        return this.orderStat;
    }

    /**
     * Getter $order_items
     * @return {Array<OrderItems>}
     */
    public get $order_items(): Array<OrderItems> {
        return this.order_items;
    }

    /**
     * Getter $order_timestamp
     * @return {Number}
     */
    public get $order_timestamp(): Number {
        return this.order_timestamp;
    }

    /**
     * Setter $user
     * @param {any} value
     */
    public set $user(value: any) {
        this.user = value;
    }

    /**
     * Setter $orderId
     * @param {String} value
     */
    public set $orderId(value: String) {
        this.orderId = value;
    }

    /**
     * Setter $orderStat
     * @param {Number} value
     */
    public set $orderStat(value: Number) {
        this.orderStat = value;
    }

    /**
     * Setter $order_items
     * @param {Array<OrderItems>} value
     */
    public set $order_items(value: Array<OrderItems>) {
        this.order_items = value;
    }

    /**
     * Setter $order_timestamp
     * @param {Number} value
     */
    public set $order_timestamp(value: Number) {
        this.order_timestamp = value;
    }




}
