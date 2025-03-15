import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: ShoppingCartItem[] = [];
  showCart: boolean = false;

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(product: Product): void {
    const existingItemIndex = this.cartItems.findIndex(item => item.itemProduct._id === product._id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity++;
      this.http.post(`${this.apiUrl}/add`, { itemProduct: product, quantity: this.cartItems[existingItemIndex].quantity })
        .subscribe({
          next: () => {
            console.log('Quantité augmentée avec succès !');
          },
          error: error => {
            console.error('Erreur lors de l\'augmentation de la quantité :', error);
          }
        });
    } else {
      const newCartItem = new ShoppingCartItem(product);
      this.cartItems.push(newCartItem);
      this.http.post(`${this.apiUrl}/add`, { itemProduct: product, quantity: 1 })
        .subscribe({
          next: () => {
            console.log('Produit ajouté au panier avec succès !');
          },
          error: error => {
            console.error('Erreur lors de l\'ajout au panier :', error);
          }
        });
    }
  }

  getCartItems(): ShoppingCartItem[] {
    return this.cartItems;
  }

  removeFromCart(item: ShoppingCartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.http.post(`${this.apiUrl}/remove`, { productID: item.itemProduct._id })
        .subscribe({
          next: () => {
            console.log('Produit retiré du panier avec succès !');
          },
          error: error => {
            console.error('Erreur lors de la suppression du produit du panier :', error);
          }
        });
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.http.post(`${this.apiUrl}/clear`, {})
      .subscribe({
        next: () => {
          console.log('Panier vidé avec succès !');
        },
        error: error => {
          console.error('Erreur lors du vidage du panier :', error);
        }
      });
  }

  isProductInCart(product: Product): boolean {
    return this.cartItems.some(item => item.itemProduct._id === product._id);
  }

  getQuantityInCart(product: Product): number {
    const item = this.cartItems.find(item => item.itemProduct._id === product._id);
    return item ? item.quantity : 0;
  }

  increaseQuantity(product: Product): void {
    const itemIndex = this.cartItems.findIndex(item => item.itemProduct._id === product._id);
    if (itemIndex > -1) {
      this.cartItems[itemIndex].quantity++;
      this.http.post(`${this.apiUrl}/add`, { itemProduct: product, quantity: this.cartItems[itemIndex].quantity })
        .subscribe({
          next: () => {
            console.log('Quantité augmentée avec succès !');
          },
          error: error => {
            console.error('Erreur lors de l\'augmentation de la quantité :', error);
          }
        });
    }
  }

  decreaseQuantity(product: Product): void {
    const itemIndex = this.cartItems.findIndex(item => item.itemProduct._id === product._id);
    if (itemIndex > -1) {
      if (this.cartItems[itemIndex].quantity > 1) {
        this.cartItems[itemIndex].quantity--;
        this.http.post(`${this.apiUrl}/decrease`, { itemProduct: product, quantity: this.cartItems[itemIndex].quantity })
          .subscribe({
            next: () => {
              console.log('Quantité diminuée avec succès !');
            },
            error: error => {
              console.error('Erreur lors de la diminution de la quantité :', error);
            }
          });
      } else {
        this.removeFromCart(this.cartItems[itemIndex]);
      }
    }
  }
}
