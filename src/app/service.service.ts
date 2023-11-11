import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private prefixURL : string = "http://127.0.0.1:5000"

  constructor(
    private http: HttpClient,
  ) { }

  async getAllProduct(){
    const url = this.prefixURL + "/getallproduct";
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return JSON.parse(textResponse!);
  }

  async getProductbyID(id : number){
    const url = this.prefixURL + `/getproduct?id=${id}`;
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return JSON.parse(textResponse!)[0];
  }

  async getProductbyCategory(category : string){
    const url = this.prefixURL + `/getproductlist?category=${category}`;
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return JSON.parse(textResponse!);
  }


  async newProduct(newProductObject : newProductObject){
    var body = JSON.stringify(newProductObject);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/newproduct";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }


  async updateProduct(updateProductObject : updateProductObject){
    var body = JSON.stringify(updateProductObject);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/updateproduct";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
  async updateSellCount(id: number, salecount: number, rating: number){
    var body = JSON.stringify({
      id: id,
      salecount: salecount,
      rating: rating
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/updatesellcount";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }

  async deleteProductbyId(id : number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + `/deleteproduct?id=${id}`;
    return await this.http.delete<any>(url, httpOptions).toPromise();
  }
  
}
