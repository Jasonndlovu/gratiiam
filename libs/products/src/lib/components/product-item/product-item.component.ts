import { Component, OnInit, Input } from '@angular/core';
import { CartItem, CartService } from '@comp/orders';
import { Product } from '../../models/product';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  addProductToCart() {

    console.log("The button was hit");
    const cartItem: CartItem = {
      productId: this.product['id'],
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
