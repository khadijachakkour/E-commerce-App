import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: ShoppingCartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: ShoppingCartItem): void {
    this.cartService.removeFromCart(item);
    this.loadCartItems();
  }


  calculateTotal(item: ShoppingCartItem): number {
    return item.quantity * item.itemProduct.productPrice;
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.loadCartItems();
  }

  confirmRemove = false;
  toggleRemoveConfirmation(item: any): void {
    item.confirmRemove = !item.confirmRemove;
  }

  isRemoveConfirmationVisible(item: any): boolean {
    return item.confirmRemove;
  }

  increaseQuantity(item: ShoppingCartItem): void {
    this.cartService.increaseQuantity(item.itemProduct);
    this.loadCartItems();
  }

  decreaseQuantity(item: ShoppingCartItem): void {
    this.cartService.decreaseQuantity(item.itemProduct);
    this.loadCartItems();
  }

  getQuantityInCart(item: ShoppingCartItem): number {
    return this.cartService.getQuantityInCart(item.itemProduct);
  }
}




