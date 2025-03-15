import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CatalogNavigationComponent } from './catalog-navigation/catalog-navigation.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { adminGuard } from './guards/admin.guard';
import { clientGuard } from './guards/client.guard';
import { ProfileComponent } from './profile/profile.component';
import { ReadUserComponent } from './ManageUsers/read-user/read-user.component';
import { AddProductComponent } from './ManageProducts/add-product/add-product.component';
import { ReadProductComponent } from './ManageProducts/read-product/read-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'catalogNv', component: CatalogNavigationComponent },
  { path: 'catalog', component: CatalogComponent, title: 'Catalog' },
  {path: 'catalog/:filter', component : CatalogComponent, title: 'My Catalog products'},
  {path : 'product-details', component : ProductDetailsComponent, title: 'Product details'},
  {path : 'cart', component : CartComponent, title: 'My cart', canActivate: [clientGuard]},
  {path : 'signin', component:SigninComponent, title: 'SignIn'},
  {path: 'signUp', component:RegisterComponent, title: 'signUp'},
  {path: 'profile', component: ProfileComponent, title:'profile'},
  { path: 'manage-products/add', component: AddProductComponent , canActivate: [adminGuard]},
  { path: 'manage-products/read', component: ReadProductComponent , canActivate: [adminGuard]},
  { path: 'manage-users/read', component: ReadUserComponent , canActivate: [adminGuard]},
  { path: '**', component: PageNotFoundComponent }
];
