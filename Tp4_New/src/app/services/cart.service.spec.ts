import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/Product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    const product: Product = new Product();
    product.productID = '1';
    product.productTitle = 'Product 1';
    product.productImage = 'image.jpg';
    product.category = 'category';
    product.productPrice = '10';

    service.addToCart(product);

    expect(service.getCartItems().length).toBe(1);
    expect(service.getCartItems()[0].itemProduct).toEqual(product);
  });

  it('should remove product from cart', () => {
    const product: Product = new Product();
    product.productID = '1';
    product.productTitle = 'Product 1';
    product.productImage = 'image.jpg';
    product.category = 'category';
    product.productPrice = '10';
    service.addToCart(product);

    service.removeFromCart(service.getCartItems()[0]);

    expect(service.getCartItems().length).toBe(0);
  });

  it('should clear cart', () => {
    const product: Product = new Product();
    product.productID = '1';
    product.productTitle = 'Product 1';
    product.productImage = 'image.jpg';
    product.category = 'category';
    product.productPrice = '10';
    service.addToCart(product);

    service.clearCart();

    expect(service.getCartItems().length).toBe(0);
  });
});
