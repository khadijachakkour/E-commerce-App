import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from "../../product-details/product-details.component";
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartComponent } from '../../cart/cart.component';
import { ShoppingCartItem } from '../../models/ShoppingCartItem';
import { IUser } from '../../models/User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-read-product',
  standalone:true,
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.css'],
  imports: [CommonModule,ProductDetailsComponent,CartComponent]

})
export class ReadProductComponent implements OnInit {

  @Input() products: Product[] = [];

  cartItems: ShoppingCartItem[] = [];

  filter: string="";
  user: IUser | null = null;

  constructor( private route: ActivatedRoute,private router:Router,
              private productService: ProductService,private cartService: CartService,private userService: UserService) { }


  ngOnInit(): void {
    if (this.route.params) {
    this.route.params.subscribe(params => {
      this.filter = params['filter'];
      if (this.filter) {
        this.loadProductsByFilter();
      } else {
        this.loadAllProducts();
      }
    });
  }
  const user = this.userService.getUser();
    if (user) {
      user.subscribe({
        next: (user) => { this.user = user; }
      });
    }
}

  loadAllProducts(): void {
          this.productService.getProducts().subscribe(products => {
          this.products = products;
    });
  }

  loadProductsByFilter(): void {
          this.productService.getProductsByFilter(this.filter).subscribe(products => {
          this.products = products;
    });
  }

  productDetailsVisibility: { [key: string]: boolean } = {};


  toggleProductDetails(product: Product): void {
    const productId = product._id;
    this.productDetailsVisibility[productId] = !this.productDetailsVisibility[productId];
  }

  isProductDetailsVisible(product: Product): boolean {
    const productId = product._id;
    return this.productDetailsVisibility[productId];
  }

  getProductDetailsButtonText(product: Product): string {
    return this.isProductDetailsVisible(product) ? 'Hide' : 'Details';
  }



  editProduct(product: Product): void {
    this.router.navigate(['/manage-products/update', product._id]);
  }


    supprimerProduit(_id: string): void {
      this.productService.deleteProduct(_id).subscribe(() => {
        // Une fois le produit supprimé avec succès, rechargez la liste des produits depuis le serveur
        if (this.filter) {
          this.loadProductsByFilter();
        } else {
          this.loadAllProducts();
        }
      });
    }



}
