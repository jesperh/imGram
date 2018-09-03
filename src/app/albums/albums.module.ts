import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumsRoutingModule} from './/albums-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AlbumsComponent } from './albums.component';

@NgModule({
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [AlbumsComponent]
})
export class AlbumsModule { }
