import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { CategoryFormComponent } from './features/categories/category-form/category-form.component';
import { CategoryDetailComponent } from './features/categories/category-detail/category-detail.component';
import { UserProfileComponent } from './features/user/user-profile.component';
import { LoginComponent } from './features/login/login.component';

import { adminGuard } from './core/auth/admin.guard';
import { authGuard } from './core/auth/auth.guard';

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
