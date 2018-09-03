import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ErrorMessageComponent} from "./error-message/error-message.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [ErrorMessageComponent]
})
export class SharedModule { }
