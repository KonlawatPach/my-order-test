import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  public productList:any = [];

  constructor(
    private crudService : ServiceService
  ){}

  async ngOnInit(){
    this.productList =  await this.crudService.getAllProduct();
    console.log(this.productList);
  }

  
}
