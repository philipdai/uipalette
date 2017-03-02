import { Component, OnInit, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { hexToHsl, rgbToHsl, hexToRgb } from '../common/color-conversion';
import { MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hexForm: FormGroup;
  hexValue: AbstractControl;
  hexToHsl: Function;
  baseHsl: any;
  tmpHsl: any;
  baseHslArr2: Array<any>;
  hslArr1: Array<any>;
  row1ShowBtnCopy: Array<any>;
  hslArr2: Array<any>;
  row2ShowBtnCopy: Array<any>;
  hslArr3: Array<any>;
  row3ShowBtnCopy: Array<any>;
  bodyWidth: number;
  toggleColorPicker: boolean;
  selectedColor: string;
  defaultColorFormat: string;

  constructor(private fb: FormBuilder, public modal: MdDialog) {
    this.hexToHsl = hexToHsl;
  }

  ngOnInit(): void {
    this.buildForm();
    this.tmpHsl = [];
    this.baseHsl = '';
    this.baseHslArr2 = [];
    this.hslArr1 = [];
    this.hslArr2 = [];
    this.hslArr3 = [];
    this.row1ShowBtnCopy = [false, false, false, false, false, false, false, false, false];
    this.row2ShowBtnCopy = [false, false, false, false, false, false, false, false, false];
    this.row3ShowBtnCopy = [false, false, false, false, false, false, false, false, false];
    this.bodyWidth = window.innerWidth || document.body.clientWidth;
    this.toggleColorPicker = false;
    this.defaultColorFormat = 'HSL';
    this.initHslaArrs();
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

    if (event.code === "Enter" && this.hexForm.get('hexValue').value.length > 0) {
      this.clearHexVal();
      this.calBaseHsl(this.hexForm.get('hexValue').value);
      return;
    }

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
    if (hexVal.length === 0) return;
    this.clearHexVal();
    this.tmpHsl = hexToHsl(this.dealHashStr(hexVal));
    this.baseHsl = `hsl(${this.tmpHsl[0]}, ${this.tmpHsl[1]}%, ${this.tmpHsl[2]}%)`;
    this.calHslArr2();

  }

  calHslArr2(): void {
    let baseHue = parseInt(this.tmpHsl[0], 10);
    let baseSaturation = parseInt(this.tmpHsl[1], 10);
    let baseLightness = parseInt(this.tmpHsl[2], 10);
    let tmpHue = 0;

    for (let i = 0; i < 9; i++) {
      tmpHue = (baseHue + 40 * i) % 360;
      this.baseHslArr2.push([tmpHue, baseSaturation, baseLightness]);
      this.hslArr2.push(`hsl(${tmpHue}, ${baseSaturation}%, ${baseLightness}%)`);
    }

    this.calHslArr1();
    this.calHslArr3();
  }

  initHslaArrs(): void {
    this.clearHexVal();
    for (let i = 0; i < 9; i++) {
      this.hslArr1.push(`hsla(0, 0%, 85%, 0.${i * 10})`);
      this.hslArr2.push(`hsla(0, 0%, 55%, 0.${i * 10})`);
      this.hslArr3.push(`hsla(0, 0%, 25%, 0.${i * 10})`);
    }
  }

  calHslArr1(): void {
    let tmpHue = 0;
    let tmpSaturation = 0;
    let tmpLightness = 0;

    for (let i = 0; i < 9; i++) {
      tmpHue = Math.ceil((this.baseHslArr2[i][0] + 3.6) % 360);
      tmpSaturation = this.baseHslArr2[i][1];
      if ((this.baseHslArr2[i][1] - 29) >= 0) {
        tmpSaturation = (this.baseHslArr2[i][1] - 29);
      }
      tmpLightness = this.baseHslArr2[i][2];
      if ((this.baseHslArr2[i][2] + 3) <= 100) {
        tmpLightness = (this.baseHslArr2[i][2] + 3);
      }

      this.hslArr1.push(`hsl(${tmpHue}, ${tmpSaturation}%, ${tmpLightness}%)`);
    }
  }

  clearHexVal(): void {
    this.hslArr2 = [];
    this.hslArr1 = [];
    this.hslArr3 = [];
    this.baseHslArr2 = [];
  }

  calHslArr3(): void {
    let tmpHue = 0;
    let tmpSaturation;
    let tmpLightness;

    for (let i = 0; i < 9; i++) {
      tmpHue = Math.ceil((this.baseHslArr2[i][0] - 3.6) % 360);
      tmpSaturation = this.baseHslArr2[i][1];
      if ((this.baseHslArr2[i][1] + 1) <= 100) {
        tmpSaturation = (this.baseHslArr2[i][1] + 1);
      }
      tmpLightness = this.baseHslArr2[i][2];
      if ((this.baseHslArr2[i][2] - 13 ) >= 0) {
        tmpLightness = (this.baseHslArr2[i][2] - 13);
      }

      this.hslArr3.push(`hsl(${tmpHue}, ${tmpSaturation}%, ${tmpLightness}%)`);
    }
  }

  openSnackBar(val) {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    this.selectedColor = val;
    // After 2 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2000);
  }

  openCopyModal() {
    let config = new MdDialogConfig();
    config.width = `${this.bodyWidth * 0.4}px`;
    config.height = `${this.bodyWidth * 0.32}px`;
    config.disableClose = true;
    let modalRef: MdDialogRef<PhotoModalComponent> = this.modal.open(PhotoModalComponent, config);
    modalRef.componentInstance.hslArr1 = this.hslArr1;
    modalRef.componentInstance.hslArr2 = this.hslArr2;
    modalRef.componentInstance.hslArr3 = this.hslArr3;
  }

}

@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.html',
  styleUrls: ['./app.component.css']
})
export class PhotoModalComponent {
  @Input() hslArr1: Array<any>;
  @Input() hslArr2: Array<any>;
  @Input() hslArr3: Array<any>;

  constructor(public modalRef: MdDialogRef<PhotoModalComponent>) {

  }
}