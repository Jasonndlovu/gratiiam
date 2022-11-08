import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@comp/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products = [];
 // products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {

   // console.log("getting products");
   // console.log(this.products['name']);
   // console.log(this.products['id']);

    this.productsService.getProductss().subscribe((products) => {this.products = products});
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {

    console.log("the button was hit for sure");

    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {this.productsService.deleteProduct(productId).subscribe(
          () => { this._getProducts();this.messageService.add({severity: 'success',summary: 'Success',detail: 'Product is deleted!'});},
          () => {this.messageService.add({severity: 'error', summary: 'Error',detail: 'Product is not deleted!'});}
        );
      }
    });
  }
}