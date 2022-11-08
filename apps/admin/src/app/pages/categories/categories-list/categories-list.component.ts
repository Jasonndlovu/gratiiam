import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@comp/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

    categories :Category[] = [];
  constructor( private categoriesService: CategoriesService, private messageService: MessageService,private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }


  deleteCategory(categoryID : string){

    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {    this.categoriesService.deleteCategory(categoryID).subscribe((response) =>{ this._getCategories();
        this.messageService.add({severity:'success',summary:'Success',detail:'Category has been deleted'})
      },
      (error)=>{this.messageService.add({severity:'error',summary:'Error',detail:'Category has not been created'});});
      }
    });
}
 
 updateCategory(categoryID : string){
  this.router.navigateByUrl(`categories/form/${categoryID}`)
 }

  private _getCategories(){
    console.log("getting categories");
    console.log(this.categories['name']);
    console.log(this.categories['id']);
    this.categoriesService.getCategories().subscribe(cats =>{
    this.categories = cats;
  })}

}
