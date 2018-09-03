import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageComponent } from './image.component';
import {SharedModule} from "../shared.module";
import {ImageRoutingModule} from "./image-routing.module";
import {AngularMaterialModule} from "../angular-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ImageDetailsComponent} from "./details/image-details.component";
import { RelatedImagesComponent } from './related-images/related-images.component';

@NgModule({
  imports: [
    ImageRoutingModule,
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ImageComponent,
    ImageDetailsComponent,
    RelatedImagesComponent,
    RelatedImagesComponent
  ]
})
export class ImageModule { }
