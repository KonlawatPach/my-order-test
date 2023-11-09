import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit  {
  public imageURL:string = '';

  newProductForm = this.formBuilder.group({
    name: ['', Validators.required ],
    image: ['', Validators.required ],
    price: ['', Validators.required ],
    discount: ['', Validators.required ],
    description: ['', Validators.required ],
    seller: ['', Validators.required ],
    category: ['', Validators.required ]
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
      
  }

  imageInputOnchange(urlImage : any){
    this.imageURL = urlImage.value;
  }

  async submitNewProduct(){
    let productObject = {
      this.newProductForm.
    }
    
  }
  //   this.isLogin = true;
  //   if(this.loginForm.valid){
  //     let res = await this.crud.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  //     if(res.status == 'complete'){
  //       if(res.userstatus == 'request'){
  //         alert("กรุณารอผู้ดูแลตรวจสอบ");
  //         this.router.navigate(['']);
  //       }else{
  //         this.auth.login(this.loginForm.value.email + res.role);
  //         this.loginForm.reset();
  //         if(res.role == 'admin'){
  //           this.router.navigate(['/admin']);
  //         }
  //         else{
  //           this.router.navigate(['']);
  //         }
  //       }
  //     }
  //     else{
  //       alert('รหัสผ่านผิด')
  //     }
  //   }
  //   else{
  //     alert('กรอกไม่ครบ')
  //   }
  //   this.isLogin = false;
  // }

}
