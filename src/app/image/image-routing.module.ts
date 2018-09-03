import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {ImageComponent} from "./image.component";
import {ImageDetailsComponent} from "./details/image-details.component";


const routes: Routes = [
  {
    path: '',
    component: ImageComponent
  },
  {
    path: 'details/:id',
    component: ImageDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
