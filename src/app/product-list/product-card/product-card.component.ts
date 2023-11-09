import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productObject : any = {}
  public ImageURL: any = '';
  
  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    this.ImageURL = this.blobtoURL(this.productObject.image);
  }
  
  blobtoURL(blobText: string){
    const imageUrl = 'data:image/png;base64,' + blobText;
    let URLimage = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
    return URLimage;
  }
  
}