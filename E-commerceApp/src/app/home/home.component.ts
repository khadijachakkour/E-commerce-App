import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogComponent } from '../catalog/catalog.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../models/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CatalogComponent,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private productService: ProductService,private userService: UserService) { }

  searchQuery: string = '';
  searchResults: Product[] = [];

  searchProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
    }
else{
    this.productService.searchProductsByTitle(this.searchQuery.trim())
      .subscribe({
        next: (products: Product[]) => {
          this.searchResults = products;
        },
        error: (err) => {
          this.searchResults = [];
          console.error('Error occurred while searching products:', err);
        }
      });
  }
}

currentUser: IUser | null = null;


  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

}






