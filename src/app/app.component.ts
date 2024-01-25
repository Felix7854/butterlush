import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  submitForm: FormGroup;
  isGood = false;
  isVisible = false;
  index: number;
  username: string;
  contact: string;
  product: string;
  date: string;
  modeOfPickup: string;
  amount: string;

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      products: new FormArray([]),
      date: new FormControl(null, Validators.required),
      modeofPickp: new FormControl(null, Validators.required),
    });
  }

  addProduct() {
    this.isVisible = true;
    const productGroup = new FormGroup({
      product: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });

    (<FormArray>this.submitForm.get('products')).push(productGroup);
  }

  getControls() {
    return (<FormArray>this.submitForm.get('products')).controls;
  }

  onDelete(index: number) {
    (<FormArray>this.submitForm.get('products')).removeAt(index);
  }

  onSubmit() {
    this.onwhatsApp();
  }

  onwhatsApp() {
    this.username = this.submitForm.value.name;
    this.contact = this.submitForm.value.contact;
    this.product = this.submitForm.value.products[0].product;
    this.amount = this.submitForm.value.products[0].amount;
    this.date = this.submitForm.value.date;
    this.modeOfPickup = this.submitForm.value.modeofPickp;

    const whatsAppUrl =
      'https://wa.me/2330241410898?text=' +
      'Name of Customer: ' +
      this.username +
      '%0a' +
      'Contact: ' +
      this.contact +
      '%0a' +
      'Date of delivery: ' +
      this.date +
      '%0a' +
      'Products: ' +
      this.product +
      ' = ' +
      this.amount +
      '%0a' +
      'Delivery : ' +
      this.modeOfPickup;

    window.open(whatsAppUrl, '_blank').focus();
  }
}
