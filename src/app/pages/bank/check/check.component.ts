import { Component, OnInit } from '@angular/core';
import { InvoiceItem, Accounting } from '../../../models/invoiceItem';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { BankAccount } from '../../../models/bank.model';
export interface User {
  name: string;
}

export interface Bank {
  name: string;
  account: number;
}


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  // bank: Bank;

  banks: Bank = {
     name: '',
     account: null,

  };

  form: FormGroup;
  //  myControl = new FormControl();
  options: User[] = [
    {name: 'Cia General de Viveres S.A.'},
    {name: 'Bolsas Delta S.A.'},
    {name: 'Empaques de Carton Titan S.A.'}
  ];

  optionsBank: Bank[] = [
    {name: 'Banorte', account: 49051913},
    {name: 'Santander', account: 20009933},
    {name: 'Scotian Bank', account: 5666600}
  ];

  optionsAcc: Accounting[] = [
    {name: 'Banorte', accounting: '100.000.001'},
    {name: 'Proveedores', accounting: '400.000.000'},
    {name: 'Almacen MP', accounting: '200.000.00'},
    {name: 'Impuestos', accounting: '200.000.01'},
    {name: 'IVA', accounting: '200.000.02'},
    {name: 'Electricidad', accounting: '200.000.03'}


  ];

  filteredOptions: Observable<User[]>;
  filteredBankOptions: Observable<Bank[]>;
  filteredAccOptions: Observable<Accounting[]>;
  date = new Date();
  // tslint:disable-next-line:no-inferrable-types
  itemIndex: number = 0;

  constructor(private fb: FormBuilder) {
  
    this.createForm();
    this.addItem(0);
  }
  
  
  ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.form.controls['date'].setValue(currentDate);
    this.form.controls['dateop'].setValue(currentDate);
    // this.form.get('date').setValue(this.date);
    // this.banks.name = 'Serfin Santander';
    this.banks.name = this.form.get('bank').value;

  }



  get addItemArr(): FormArray {
    return this.form.get('invoiceItems') as FormArray;
}


addItem(term) {
  //  this.itemIndex = term;
  this.addItemArr.push(this.fb.group(new InvoiceItem()));
  //  this.ngOnInit();
  //  this.calculate();
}

removeItem(item) {
let i = this.addItemArr.controls.indexOf(item);
console.log('Valor de i ', i);
// if ( i !==   -1) {
//   this.addItemArr.controls.splice(i, 1);
//   let items = this.form.get('invoiceItems2') as FormArray;
//   let data = {invoiceItems2: items};
//   console.log('VALOR DE ITEMS ', items);
//   this.calculate();
// }
}


  filterUser() {
    console.log('Filter User');

    this.filteredOptions = this.form.get('cliente').valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );

  }

  filterBank() {
    console.log('Filter Bank');

    this.filteredBankOptions = this.form.get('bank').valueChanges
    .pipe(
      startWith<string | Bank>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterBank(name) : this.optionsBank.slice())
    );

  }

  filterAcc() {

    this.filteredAccOptions = this.addItemArr.controls[this.itemIndex].get('account').valueChanges
    .pipe(
    startWith<string | Accounting>(''),
    map(value =>  typeof value === 'string' ? value : value.name),
    map(name => name ? this._filterAcc(name) : this.optionsAcc.slice())
    );

  }


  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  displayBankFn(bank?: Bank): string | undefined {
    // console.log('display ', bank);
    return bank ? bank.name : undefined;
  }

  displayAccFn(acc?: Accounting): string | undefined {
    return acc ? acc.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBank(name: string): Bank[] {
    console.log('name', name);
    this.banks = this.form.get('bank').value;
    const filterBankValue = name.toLowerCase();
    return this.optionsBank.filter(option => option.name.toLowerCase().indexOf(filterBankValue) === 0);
  }
 
  private _filterAcc(name: string): Accounting[] {
    const filterAccValue = name.toLowerCase();
    return this.optionsAcc.filter(option => option.name.toLowerCase().indexOf(filterAccValue) === 0);
  }
 
  createForm() {

    this.form = this.fb.group({

        cliente: new FormControl(),
        bank: new FormControl(),
        date: new FormControl(),
        dateop: new FormControl(),
        total: new FormControl(),
        observation: new FormControl(),
        invoiceItems: this.fb.array([]),



    });


    }

    calculate() {
      console.log('calculate');
    }


    save() {

      console.log(this.form);

    }

}
