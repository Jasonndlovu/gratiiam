import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@comp/orders';
import { ProductsService } from '@comp/products';
import { UsersService } from '@comp/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
      
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}