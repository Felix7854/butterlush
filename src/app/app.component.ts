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
  isVisible = false;
  index: number;
  username: string;
  contact: string;
  product: string;
  date: string;
  modeOfPickup: string;
  amount = [];

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
    // console.log(this.submitForm);
    this.onwhatsApp();
  }

  onwhatsApp() {
    const productControl = (<FormArray>this.submitForm.get('products')).value;

    const keyValuePairs = productControl.map((product, index) => {
      const separator = index < productControl.length - 1 ? '\n' : '';
      return `product: ${product.product}, number: ${product.amount}${separator}`;
    });
    
    // Join the array into a single string
    this.product = keyValuePairs.join('');


    this.username = this.submitForm.value.name;
    this.contact = this.submitForm.value.contact;
    
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
      '%0a' +
      'Delivery : ' +
      this.modeOfPickup;

    window.open(whatsAppUrl, '_blank').focus();
  }
}
