import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SetFocusDirective } from '../directives/set-focus';
import { MdSnackBarConfig } from '@angular/material';

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
    MaterialModule
  ],
  providers: [
    MdSnackBarConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
