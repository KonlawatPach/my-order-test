import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return textResponse;
  }

  async getProductbyID(id : number){
    const url = this.prefixURL + `/getproduct?id=${id}`;
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return textResponse;
  }

  async getProductbyCategory(category : string){
    const url = this.prefixURL + `/getproductlist?category=${category}`;
    const textResponse = await this.http.get(url, {responseType: 'text'}).toPromise();
    return textResponse;
  }


  async newProduct(){
    var body = JSON.stringify({
      "name": "test",
      "image": "blob hoho",
      "description": "this is description",
      "seller": "tester man",
      "price": 999,
      "discount": 0,
      "piece": 10,
      "category": "หมา"
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/newproduct";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }


  async updateProduct(){
    var body = JSON.stringify({
      "id": 2, 
      "name": "test update",
      "image": "blob hoho update",
      "description": "this is description update",
      "seller": "tester update man",
      "price": 1000,
      "discount": 10,
      "piece": 10,
      "category": "เครื่องใช้ไฟฟ้า"
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/updateproduct";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
  async updateSellCount(){
    var body = JSON.stringify({
      "id": 0,
      "salecount": 1,
      "rating": 2
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
    var body = JSON.stringify({
      "id" : id
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json'
      })
    };
    const url = this.prefixURL + "/deleteproduct";
    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }
  
}
