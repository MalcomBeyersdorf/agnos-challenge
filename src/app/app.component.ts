import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Product {
  cols: number;
  rows: number;
  name: string;
  price: number;
  discount: number;
  tax: number;
  picked: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agnos Challenge';
  loading = false;
  products: Product[] = [
    {name: 'Coffe', cols: 1, rows: 1, price: 3, discount: 2, tax: 2, picked: false},
    {name: 'Te', cols: 1, rows: 1, price: 2, discount: 1, tax: 2, picked: false},
    {name: 'Sandwich', cols: 1, rows: 1, price: 5, discount: 3, tax: 1, picked: false},
    {name: 'A whole launch', cols: 1, rows: 1, price: 20, discount: 4, tax: 1, picked: false},
  ];

  // TODO: An array of discount with conditions to dont overlap promotions 

  constructor(private _snackBar: MatSnackBar){

  }
  
  async openSnackBar(message: string, amount: number) {
    message = message + ` $$  ${amount}`;
    this.loading = true;
    await new Promise(resolve => setTimeout(() => {
      this.loading = false;
      this._snackBar.open(message);
    }, 2000));
  }

  pickItem(index: number) {
    this.products[index].picked = !this.products[index].picked;
  }

  getItems() {
    return this.products.filter((product) => product.picked === true);
  }

  getAmount() {
    const products = this.products.filter((product) => product.picked === true);
    let total = 0;
    products.forEach((element) => {
        total += element.price;
    })
    // TODO: apply tax then discount based on promotions
    return total;
  }

  enablePay(){
    const items = this.getItems();
    return !(items.length > 0);
  }
}
