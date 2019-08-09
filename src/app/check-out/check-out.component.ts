import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping= {};
  cart: ShoppingCart;
  subscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private shoppingCartService: ShoppingCartService, private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => {this.cart = cart});
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
