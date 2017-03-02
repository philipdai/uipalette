import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent, PhotoModalComponent } from './app.component';
import { SetFocusDirective } from '../directives/set-focus';
import { MdSnackBarConfig } from '@angular/material';
import { ClipboardModule } from 'angular2-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    PhotoModalComponent,
    SetFocusDirective
  ],
  entryComponents: [
    PhotoModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    ClipboardModule
  ],
  providers: [
    MdSnackBarConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
