import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-catalog-navigation',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './catalog-navigation.component.html',
  styleUrl: './catalog-navigation.component.css'
})
export class CatalogNavigationComponent {

}
