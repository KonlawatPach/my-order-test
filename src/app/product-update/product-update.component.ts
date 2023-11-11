import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface updateProductObject {
  id : number,
  name: string,
  image: string,
  description: string,
  seller: string,
  price: number,
  discount: number,
  piece: number,
  category: 'เกี่ยวกับสัตว์เลี้ยง' | 'เครื่องใช้ไฟฟ้า' | 'ไอที' | 'ของใช้ยิบย่อยในบ้าน' | 'ของใช้ส่วนตัว' | 'อื่นๆ'
}


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
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  public imageURL:string = '';

  public oldProductData : ProductObject = {
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

  updateProductForm = this.formBuilder.group({
    name: ['', Validators.required ],
    image: ['', Validators.required ],
    price: [1, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
    description: ['', Validators.required ],
    seller: ['', Validators.required ],
    category: ['', Validators.required ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private crudService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const nowProductID = params['id'];
      this.oldProductData = await this.crudService.getProductbyID(nowProductID);

      this.updateProductForm.setValue({
        name: this.oldProductData.name,
        image: this.oldProductData.image,
        price: this.oldProductData.price,
        discount: this.oldProductData.discount,
        description: this.oldProductData.description,
        seller: this.oldProductData.seller,
        category: this.oldProductData.category
      });
      this.imageURL = this.oldProductData.image;
      console.log(this.updateProductForm.value);
    });
  } 

  imageInputOnchange(urlImage : any){
    this.imageURL = urlImage.value;
  }

  async submitUpdateProduct(){
    console.log(this.updateProductForm.value);
    if(this.updateProductForm.valid){
      let productObject: updateProductObject = {
        id : this.oldProductData.id,
        name: this.updateProductForm.value.name!,
        image: this.updateProductForm.value.image!,
        description: this.updateProductForm.value.description!,
        seller: this.updateProductForm.value.seller!,
        price: this.updateProductForm.value.price!,
        discount: this.updateProductForm.value.discount!,
        piece: this.updateProductForm.value.price!,
        category: this.updateProductForm.value.category! as 'เกี่ยวกับสัตว์เลี้ยง' | 'เครื่องใช้ไฟฟ้า' | 'ไอที' | 'ของใช้ยิบย่อยในบ้าน' | 'ของใช้ส่วนตัว' | 'อื่นๆ'
      }
      console.log(productObject);
      let response = await this.crudService.updateProduct(productObject)
      console.log(response);
      Swal.fire({
          icon : "success",
          text : response.message
      });
      this.router.navigate(['/', this.oldProductData.id])
    }   
  }

  async deleteProduct(){
    const isConfirm = await Swal.fire({
      title : "ยืนยันการลบสินค้า",
      text : "คุณต้องการลบสินค้าชิ้นนี้จริงๆใช่ไหม",
      icon : "warning",
      showCancelButton : true,
      confirmButtonColor : '#3085D6',
      cancelButtonColor : "#d33",
      confirmButtonText : "ยืนยันการลบสินค้า",
      cancelButtonText : "ยกเลิก"
    }).then((result) => {
      return result.isConfirmed
    })

    if(!isConfirm){
      return;
    }

    let response = await this.crudService.deleteProductbyId(this.oldProductData.id)
    Swal.fire({
      icon : 'success',
      text : response.message
    })
    this.router.navigate(['/'])
  }
}
