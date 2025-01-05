import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: '/product.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  newProduct: any = { name: '', category_id: null };
  updateProduct: any = null;  // To hold the product being updated
  page: number = 1;
  pageSize: number = 10;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  fetchProducts() {
    this.apiService.getProducts(this.page, this.pageSize).subscribe((data) => {
      this.products = data;
    });
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.category_id) {
      this.apiService.addProduct(this.newProduct).subscribe(() => {
        this.newProduct = { name: '', category_id: null };
        this.fetchProducts(); // Refresh the product list
      });
    }
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe(() => {
      this.fetchProducts(); // Refresh the product list
    });
  }

  // Edit Product: populate update form with selected product's data
  editProduct(product: any) {
    this.updateProduct = { ...product };  // Set the product to be updated
  }

  // Update Product
  updateProductDetails() {
    if (this.updateProduct) {
      this.apiService.updateProduct(this.updateProduct.product_id, this.updateProduct).subscribe(() => {
        this.updateProduct = null;  // Clear update form
        this.fetchProducts(); // Refresh the product list
      });
    }
  }

  nextPage() {
    this.page++;
    this.fetchProducts();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }
}
