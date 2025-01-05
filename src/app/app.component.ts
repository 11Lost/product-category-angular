import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ProductComponent, CategoryComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isCategoryRoute: boolean = false;
  isProductRoute: boolean = false;

  constructor(private router: Router) {
    // Subscribe to the router events to track changes in the route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }

  private checkRoute(): void {
    const currentRoute = this.router.url; // Get the current route URL
    this.isCategoryRoute = currentRoute.includes('category');
    this.isProductRoute = currentRoute.includes('product');
  }
}
