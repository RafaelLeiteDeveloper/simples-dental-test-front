import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { UserProfileComponent } from './components/user/user-profile.component';
import { LoginComponent } from './components/login/login.component';

import { adminGuard } from './auth/admin.guard';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'products/:id/edit', component: ProductFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [authGuard] },

  { path: 'categories', component: CategoryListComponent, canActivate: [authGuard] },
  { path: 'categories/new', component: CategoryFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [authGuard] },
  { path: 'categories/:id/edit', component: CategoryFormComponent, canActivate: [authGuard, adminGuard] },

  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '' }
];
