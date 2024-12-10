import { Component, Input } from '@angular/core';
import { Product } from '../models/Product';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-details',
  standalone:true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [CommonModule]

})
export class ProductDetailsComponent {

  @Input() product!: Product;

  constructor() { }
}
