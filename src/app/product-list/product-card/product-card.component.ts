import { Component, Input, OnInit } from '@angular/core';

interface ProductObject {
  id : number,
  name: string,
  image: string,
  description: string,
  seller: string,
  price: number,
  discount: number,
  piece: number,
  category: 'เกี่ยวกับสัตว์เลี้ยง' | 'เครื่องใช้ไฟฟ้า' | 'ไอที' | 'ของใช้ยิบย่อยในบ้าน' | 'ของใช้ส่วนตัว' | 'อื่นๆ',
  rating: number,
  ratingcount: number,
  salecount: number
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productObject : ProductObject = {
    id : 0,
    name: "",
    image: "",
    description: "",
    seller: "",
    price: 0,
    discount: 0,
    piece: 0,
    category: 'เกี่ยวกับสัตว์เลี้ยง',
    rating: 0,
    ratingcount: 0,
    salecount: 0
  }
  public priceDiscount : string = '';
  
  constructor() {}

  async ngOnInit() {
    this.priceDiscount = (this.productObject.price * (1-(this.productObject.discount/100))).toFixed(2)
  }
}