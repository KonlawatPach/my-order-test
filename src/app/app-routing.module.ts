import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: "", 
    component: ProductListComponent,
  },
  {
    path: "newproduct", 
    component: ProductNewComponent,
  },
  {
    path: "updateproduct/:id", 
    component: ProductUpdateComponent,
  },
  {
    path: ":id", 
    component: ProductDetailComponent,
  },
  {
    path: "**", 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
