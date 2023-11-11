import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface newProductObject {
  name: string,
  image: string,
  description: string,
  seller: string,
  price: number,
  discount: number,
  piece: number,
  category: 'เกี่ยวกับสัตว์เลี้ยง' | 'เครื่องใช้ไฟฟ้า' | 'ไอที' | 'ของใช้ยิบย่อยในบ้าน' | 'ของใช้ส่วนตัว' | 'อื่นๆ'
}


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit  {
  public imageURL:string = '';

  newProductForm = this.formBuilder.group({
    name: ['salid cat', Validators.required ],
    image: ['', Validators.required ],
    price: [99999, [Validators.required, Validators.min(0)]],
    discount: [99, [Validators.required, Validators.min(0), Validators.max(99)]],
    description: ['แมวลายสลิดตัวใหญ่', Validators.required ],
    seller: ['ปล่อยวัด', Validators.required ],
    category: ['เกี่ยวกับสัตว์เลี้ยง', Validators.required ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private crudService: ServiceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
      
  }

  imageInputOnchange(urlImage : any){
    this.imageURL = urlImage.value;
  }

  async submitNewProduct(){
    if(this.newProductForm.valid){
      let productObject: newProductObject = {
        name: this.newProductForm.value.name!,
        image: this.newProductForm.value.image!,
        description: this.newProductForm.value.description!,
        seller: this.newProductForm.value.seller!,
        price: this.newProductForm.value.price!,
        discount: this.newProductForm.value.discount!,
        piece: this.newProductForm.value.price!,
        category: this.newProductForm.value.category! as 'เกี่ยวกับสัตว์เลี้ยง' | 'เครื่องใช้ไฟฟ้า' | 'ไอที' | 'ของใช้ยิบย่อยในบ้าน' | 'ของใช้ส่วนตัว' | 'อื่นๆ'
      }
      console.log(productObject);
      let response = await this.crudService.newProduct(productObject)
      console.log(response);
      Swal.fire({
          icon : "success",
          text : response.message
      });
      this.router.navigate(['/'])
    }   
  }
}
