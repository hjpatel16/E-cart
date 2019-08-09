import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './Product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem} ){
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            let s = new ShoppingCartItem();
            Object.assign(s, item);
            s.$key = productId
            this.items.push(s);
        }
    }

    get totalPrice(){
        let sum = 0;
        for(let productId in this.items){
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get productIds(){
        return Object.keys(this.itemsMap);
    }
    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    getQuantity(product: Product){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
  }
}