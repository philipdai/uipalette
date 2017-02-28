import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SetFocusDirective } from '../directives/set-focus';
import { MdSnackBarConfig } from '@angular/material';
import {ColorPickerModule} from 'angular2-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    SetFocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    ColorPickerModule
  ],
  providers: [
    MdSnackBarConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
