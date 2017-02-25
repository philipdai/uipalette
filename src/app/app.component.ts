import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  hexForm: FormGroup;
  hexValue: AbstractControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.hexForm = this.fb.group({
      'hexValue': ['', [
        Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
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


}
