import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component'; // Adjust path
import { ProductComponent } from './components/product/product.component'; // Adjust path

export const routes: Routes = [
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: '', redirectTo: '/category', pathMatch: 'full' },
    { path: '**', redirectTo: '/category' },  // Handle invalid routes
];

