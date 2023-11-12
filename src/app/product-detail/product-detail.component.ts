import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

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
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public productData : ProductObject = {
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
  public discountNewPrice : string = '0';
  public cartNumber : number = 0;

  public showPopup : boolean = false;
  public opacityPopup : number = 0;
  public popUpwidth : number = 0;
  public starPoint : number = 0;

  constructor(
    private route: ActivatedRoute,
    private crudService: ServiceService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const nowProductID = params['id'];
      this.productData = await this.crudService.getProductbyID(nowProductID);
      this.discountNewPrice = (this.productData.price * (1-(this.productData.discount/100))).toFixed(2)
    });
  }

  addCart(){
    if(this.cartNumber < this.productData.piece){
      this.cartNumber+=1
    }
  }
  deleteCart(){
    if(this.cartNumber>0){
      this.cartNumber-=1
    }
  }
  checkCartNumber(cartnumfield : string){
    let cartnumfieldValue = Number(cartnumfield)
    if(cartnumfieldValue > this.productData.piece){
      this.cartNumber = this.productData.piece;
    }
    else if(cartnumfieldValue < 0){
      this.cartNumber = 0;
    }
    else{
      this.cartNumber = Number(cartnumfield);
    }
    (<HTMLInputElement>document.getElementById("cartnum")).value = String(this.cartNumber);
  }

  openPopup(){
    if(!this.showPopup){
      this.showPopup = true;
      setTimeout(() => {
        this.opacityPopup = 1;
        this.popUpwidth = 360;
      }, 200)
    }
    else if(this.showPopup){
      this.opacityPopup = 0;
      this.popUpwidth = 0;
      this.starPoint = 0;

      setTimeout(() => {
        this.showPopup = false;
      }, 200)
    }
  }
  submitCart(){
    this.openPopup()
  }
  voteStar(clickPointStar : number){
    this.starPoint = clickPointStar;
  }
  async buyProduct(){
    let response = await this.crudService.updateSellCount(this.productData.id, this.cartNumber, this.starPoint)
    console.log(response);
    Swal.fire({
        icon : "success",
        text : response.message
    });
    this.router.navigate(['/'])
  }
}