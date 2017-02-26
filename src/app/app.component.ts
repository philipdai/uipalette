import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import { hexToHsl, rgbToHsl, hexToRgb } from '../common/color-conversion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  hexForm: FormGroup;
  hexValue: AbstractControl;
  hexToHsl: Function;
  baseHsl: any;
  tmpHsl: any;
  hslArr1: Array<any>;
  rgbArr1: Array<any>;
  hslArr2: Array<any>;
  rgbArr2: Array<any>;
  hslArr3: Array<any>;
  rgbArr3: Array<any>;
  bodyWidth: number;

  constructor(private fb: FormBuilder) {
    this.hexToHsl = hexToHsl;

  }

  ngOnInit(): void {
    this.buildForm();
    this.tmpHsl = [];
    this.baseHsl = '';
    this.hslArr1 = [];
    this.hslArr2 = [];
    this.hslArr3 = [];
    this.rgbArr1 = [];
    this.rgbArr2 = [];
    this.rgbArr3 = [];
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

  calBaseHsl(hexVal): any {
    this.tmpHsl = hexToHsl(this.dealHashStr(hexVal));
    this.baseHsl = `hsl(${this.tmpHsl[0]}, ${this.tmpHsl[1]}%, ${this.tmpHsl[2]}%)`;

    this.calHslArr1();
  }

  calHslArr1(): void {
    let baseHue = parseInt(this.tmpHsl[0], 10);
    let baseSaturation = parseInt(this.tmpHsl[1], 10);
    let baseLightness = parseInt(this.tmpHsl[2], 10);
    let tmpHue = 0;
    let tmpSaturation = 0;
    let tmpLightness = 0;

    for (let i = 0; i < 9; i++) {
      tmpHue = (baseHue + 36 * i) % 360;
      if ((baseSaturation - 29 * i) >= 0) {
        tmpSaturation = (baseSaturation -29 * i) % 100;
      }

      if ((baseLightness + 3 * i) <= 100) {
        tmpLightness = (baseLightness + 3 * i) % 100;
      }

      this.hslArr1.push(`hsl(${tmpHue}, ${tmpSaturation}%, ${tmpLightness}%)`);
    }

  }
}
