import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'] // Corrected property
})
export class AddProductComponent {

  constructor(private http: HttpClient, private router: Router) {}

  addProduct(title: string, price: number, category: string, details: string, imagePath: string) {
    const newProduct = {
      productTitle: title,
      productPrice: price,
      category: category,
      description: details,
      productImage: imagePath,
    };

    console.log('Nouveau produit à ajouter :', newProduct);

    this.http.post<any>('http://localhost:3000/api/products', newProduct).subscribe({
      next: () => {
        console.log('Produit ajouté avec succès');
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      }
    });
  }
}
