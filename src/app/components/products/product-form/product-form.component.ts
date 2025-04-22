import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';
import {TextareaFieldComponent} from '../../../shared/components/textarea-field/textarea-field.component';
import {InputFieldComponent} from '../../../shared/components/input-field/input-field.component';
import {SelectFieldComponent} from '../../../shared/components/select-field/select-field.component';
import {CheckboxFieldComponent} from '../../../shared/components/checkbox-field/checkbox-field.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TextareaFieldComponent,
    InputFieldComponent,
    SelectFieldComponent,
    CheckboxFieldComponent
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | undefined;
  isEditMode = false;
  loading = false;
  categories: Category[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.productId = +params['id'];
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }

  get nameControl(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.productForm.get('description') as FormControl;
  }

  get priceControl(): FormControl {
    return this.productForm.get('price') as FormControl;
  }

  get codeControl(): FormControl {
    return this.productForm.get('code') as FormControl;
  }

  get categoryIdControl(): FormControl {
    return this.productForm.get('categoryId') as FormControl;
  }

  get statusControl(): FormControl {
    return this.productForm.get('status') as FormControl;
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
      price: [1, [Validators.required, Validators.min(1)]],
      status: [true],
      code: [''],
      categoryId: ['', [Validators.required]]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.content;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        this.snackBar.open('Error loading categories', 'Close', { duration: 3000 });
      }
    });
  }


  loadProduct(id: number): void {
    this.loading = true;

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description ?? '',
          price: product.price,
          status: product.status,
          code: product.code ?? '',
          categoryId: product.category?.id ?? ''
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product', error);
        this.snackBar.open('Error loading product', 'Close', { duration: 3000 });
        this.loading = false;
        this.router.navigate(['/products']).then(r => {
          this.snackBar.open('Product not found', 'Close', { duration: 3000 });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;
    const productData: Product = {
      ...this.productForm.value
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: (_) => {
          this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.snackBar.open('Error updating product', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: (_) => {
          this.snackBar.open('Product created successfully', 'Close', { duration: 3000 });
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error creating product', error);
          this.snackBar.open('Error creating product', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }
}
