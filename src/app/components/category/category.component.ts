import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';
  update: { id: number, name: string } | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    if (this.newCategoryName) {
      this.apiService.addCategory({ name: this.newCategoryName }).subscribe(() => {
        this.newCategoryName = '';
        this.fetchCategories();
      });
    }
  }

  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(() => {
      this.fetchCategories();
    });
  }

  updateCategory(category: { id: number, name: string }) {
    this.update = { ...category }; // Pre-fill the input with the current category data
  }

  submitUpdate() {
    if (this.update) {
      this.apiService.updateCategory(this.update.id, this.update).subscribe(() => {
        this.update = null; // Clear the update state
        this.fetchCategories(); // Refresh the category list
      });
    }
  }
}
