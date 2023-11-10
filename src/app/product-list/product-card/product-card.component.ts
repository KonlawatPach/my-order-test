import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productObject : any = {}
  
  constructor() {}

  async ngOnInit() {
    this.productObject.discount = (this.productObject.price * (1-(this.productObject.discount/100))).toFixed(2)
  }

  
  
}