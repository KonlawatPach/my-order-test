import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  public productList: ProductObject[] = [];
  public sortBy:string = 'name';
  public orderType: string = 'ASC';

  constructor(
    private crudService : ServiceService,
    private route: ActivatedRoute,
  ){}

  async ngOnInit(){
    this.route.queryParams.subscribe(async params => {
      let category = params['category'];
      if(category){
        this.productList = await this.crudService.getProductbyCategory(category);
      }else{
        this.productList = await this.crudService.getAllProduct();
      }

      this.sortDataOrder();
      console.log(this.productList);
    });
  }

  changeSort(event: any) {
    this.sortBy = event.value;
    this.sortDataOrder();
  }
  
  changeOrder(event: any) {
    this.orderType = event.value;
    this.sortDataOrder();
  }
  
  sortDataByElement(firstOrdernum: number, lastOrdernum: number) {
    switch (this.sortBy) {
      case 'name':
        this.productList.sort((a, b) => (a.name > b.name) ? firstOrdernum : ((b.name > a.name) ? lastOrdernum : 0));
        return;
      case 'price':
        this.productList.sort((a, b) => ((a.price * (1 - (a.discount / 100))) > (b.price * (1 - (b.discount / 100)))) ? firstOrdernum : (((b.price * (1 - (b.discount / 100))) > (a.price * (1 - (a.discount / 100)))) ? lastOrdernum : 0));
        return;
    }
  }
  
  sortDataOrder() {
    if (this.orderType.match('ASC')) this.sortDataByElement(1, -1);
    else this.sortDataByElement(-1, 1);
  }

}  