import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

}
