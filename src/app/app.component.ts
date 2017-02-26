import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import { hexToHsl } from '../common/color-conversion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  hexForm: FormGroup;
  hexValue: AbstractControl;
  hexToHsl: Function;
  hslArr1: Array<any>;
  hslArr2: Array<any>;
  hslArr3: Array<any>;
  bodyWidth: number;

  constructor(private fb: FormBuilder) {
    this.hexToHsl = hexToHsl;
  }

  ngOnInit(): void {
    this.buildForm();
    this.hslArr1 = [];
    this.hslArr2 = [];
    this.hslArr3 = [];
    this.bodyWidth = window.innerWidth || document.body.clientWidth;
  }

  buildForm(): void {
    this.hexForm = this.fb.group({
      'hexValue': ['', [
        Validators.pattern(/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)|(^[A-Fa-f0-9]{6}$)|(^[A-Fa-f0-9]{3}$)/)
      ]]
    });

    this.hexValue = this.hexForm.controls['hexValue'];
  }

  _keyPress(event: any) {
    const pattern = /#|[A-Fa-f0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  dealHashStr(str: string): string {
    let returnStr = '';
    if (str.length > 0) {
      if (str.indexOf('#') === -1) {
        returnStr = '#' + str;
      } else {
        returnStr = str;
      }
    }
    return returnStr;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.bodyWidth = event.target.innerWidth;
  }

}
