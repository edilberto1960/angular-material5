import { Component, OnInit } from '@angular/core';
import { AccountingItems, Accounting } from '../../../models/accountingItem';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { BankAccount } from '../../../models/bank.model';
import swal from 'sweetalert';
import { BankService } from '../../../services/bank/bank.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier.model';


export interface User {
  name: string;
}

export interface Bank {
  id: number;
  nameBank: string;
  accountNumber: string;
   address: string;
   email: string;
   phone: string;
   observation: string;
   balance: number;

}


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  // bank: Bank;
  // tslint:disable-next-line:no-inferrable-types
  update: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  totalCredit: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  totalDebit: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  totalAcc: boolean = true;

   banks: Bank = {
    id: null,
    nameBank: '',
    accountNumber: '',
     address: '',
     email: '',
     phone: '',
     observation: '',
     balance: null

   };

  form: FormGroup;
  //  myControl = new FormControl();
  options: User[] = [
    {name: 'Cia General de Viveres S.A.'},
    {name: 'Bolsas Delta S.A.'},
    {name: 'Empaques de Carton Titan S.A.'}
  ];

  // optionsBank: Bank[] = [
  //   {id: 1, nameBank: 'Banorte', accountNumber: 49051913, email},
  //   {id: 2, nameBank: 'Santander', accountNumber: 20009933},
  //   {id: 3, nameBank: 'Scotian Bank', accountNumber: 5666600}
  // ];

  // data received from Database
  bankAccounts: BankAccount[];
  suppliers: Supplier[];

  optionsAcc: Accounting[] = [
    {nameAccount: 'Banorte', accounting: '100.000.001'},
    {nameAccount: 'Proveedores', accounting: '400.000.000'},
    {nameAccount: 'Almacen MP', accounting: '200.000.00'},
    {nameAccount: 'Impuestos', accounting: '200.000.01'},
    {nameAccount: 'IVA', accounting: '200.000.02'},
    {nameAccount: 'Electricidad', accounting: '200.000.03'}


  ];

  filteredOptions: Observable<User[]>;
  // filteredBankOptions: Observable<Bank[]>;
  filteredSupplierOptions: Observable<Supplier[]>;
  // this options from Database
  filteredBankOptions: Observable<BankAccount[]>;

  filteredAccOptions: Observable<Accounting[]>;
  date = new Date();
  // tslint:disable-next-line:no-inferrable-types
  itemIndex: number = 0;

  constructor(private fb: FormBuilder,
              private bankService: BankService,
              private supplierService: SupplierService) {

    this.createForm();
    this.addItem(0);
    this.bankService.getAllAccounts().subscribe(
      result => this.bankAccounts = result
    );
    this.supplierService.getAllSuppliers().subscribe(
      res => this.suppliers = res
    );

  }


  ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.form.controls['date'].setValue(currentDate);
    this.form.controls['dateOperation'].setValue(currentDate);
    // this.form.get('date').setValue(this.date);
    // this.banks.name = 'Serfin Santander';
    this.banks = this.form.get('bank').value;

  }



  get addItemArr(): FormArray {
    return this.form.get('accountingItems') as FormArray;
}


addItem(term) {
  //  this.itemIndex = term;
  this.addItemArr.push(this.fb.group(new AccountingItems()));
  //  this.ngOnInit();
  //  this.calculate();
}

removeItem(item) {
const i = this.addItemArr.controls.indexOf(item);
console.log('Valor de i ', i);
// if ( i !==   -1) {
//   this.addItemArr.controls.splice(i, 1);
//   let items = this.form.get('invoiceItems2') as FormArray;
//   let data = {invoiceItems2: items};
//   console.log('VALOR DE ITEMS ', items);
//   this.calculate();
// }
}


  // filterUser() {
  //   console.log('Filter User');

  //   this.filteredOptions = this.form.get('supplier').valueChanges
  //   .pipe(
  //     startWith<string | User>(''),
  //     map(value => typeof value === 'string' ? value : value.name),
  //     map(name => name ? this._filter(name) : this.options.slice())
  //   );

  // }


  filterBank() {
    console.log('Filter Bank');

    this.filteredBankOptions = this.form.get('bank').valueChanges
    .pipe(
      startWith<string | BankAccount>(''),
      map(value => typeof value === 'string' ? value : value.nameBank),
      map(name => name ? this._filterBank(name) : this.bankAccounts.slice())
    );

  }

  filterSupplier() {
    console.log('Filter Supplier');

    this.filteredSupplierOptions = this.form.get('supplier').valueChanges
    .pipe(
      startWith<string | Supplier>(''),
      map(value => typeof value === 'string' ? value : value.nameSupplier),
      map(name => name ? this._filterSupplier(name) : this.suppliers.slice())
    );

  }


  filterAcc() {

    this.filteredAccOptions = this.addItemArr.controls[this.itemIndex].get('account').valueChanges
    .pipe(
    startWith<string | Accounting>(''),
    map(value =>  typeof value === 'string' ? value : value.nameAccount),
    map(name => name ? this._filterAcc(name) : this.optionsAcc.slice())
    );

  }


  // displayFn(user?: User): string | undefined {
  //   return user ? user.name : undefined;
  // }

  displayBankFn(bank?: BankAccount): string | undefined {
    // console.log('display ', bank);
    return bank ? bank.nameBank : undefined;
  }

  displaySupplierFn(supp?: Supplier): string | undefined {
    return supp ? supp.nameSupplier : undefined;
  }

  displayAccFn(acc?: Accounting): string | undefined {
    return acc ? acc.nameAccount : undefined;
  }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();
  //   return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  private _filterBank(name: string): BankAccount[] {
    console.log('name', name);
    this.banks = this.form.get('bank').value;
    const filterBankValue = name.toLowerCase();
    return this.bankAccounts.filter(option => option.nameBank.toLowerCase().indexOf(filterBankValue) === 0);
  }

  private _filterSupplier(name: string): Supplier[] {
    console.log('name', name);
  //  this.suppliers = this.form.get('supplier').value;
    const filterSupplierValue = name.toLowerCase();
    return this.suppliers.filter(option => option.nameSupplier.toLowerCase().indexOf(filterSupplierValue) === 0);
  }


  private _filterAcc(name: string): Accounting[] {
    const filterAccValue = name.toLowerCase();
    return this.optionsAcc.filter(option => option.nameAccount.toLowerCase().indexOf(filterAccValue) === 0);
  }

  createForm() {

    this.form = this.fb.group({

        supplier: new FormControl('', [Validators.required]),
        bank: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        dateOperation: new FormControl('', [Validators.required]),
        reference: new FormControl('', [Validators.required]),
        description: new FormControl(),
        checkAmount: new FormControl('', [Validators.required]),
        accountingItems: this.fb.array([], [Validators.required]),

    });
    this.form.get('accountingItems').valueChanges.subscribe(
     result => {
       console.log('This Form ', this.form),
       this.calculate();
     }


    );

    this.form.get('checkAmount').valueChanges.subscribe(
      res => {
        const tot = this.form.get('checkAmount').value;
        this.addItemArr.controls[0].get('credit').setValue(tot);
      }
    );

    this.form.get('bank').valueChanges.subscribe(
      res => {
        const data = this.form.get('bank').value.accountName;
        this.addItemArr.controls[0].get('account').setValue(data);
        this.addItemArr.controls[0].get('debit').setValue(0);
        this.addItem(1);
        console.log('Data ', data);
      }
    );

    this.form.get('supplier').valueChanges.subscribe(
      res => {
        const data = this.form.get('supplier').value.accountName;
        this.addItemArr.controls[1].get('account').setValue(data);
        this.addItemArr.controls[1].get('credit').setValue(0);
      }
    );

    }

    calculate() {
      console.log('calculate');
      this.totalCredit = this.addItemArr.controls[0].get('credit').value;
      this.totalDebit = 0;
      console.log('Array Length ', this.addItemArr.length);

      for (let i = 1; i < this.addItemArr.length; i++) {
        // this.addItemArr.controls[i].get('credit').setValue(0);
        this.totalDebit = this.totalDebit + this.addItemArr.controls[i].get('debit').value;
        this.totalCredit = this.totalCredit + this.addItemArr.controls[i].get('credit').value;
        console.log('Credit ', this.totalCredit);
        console.log('Debit ', this.totalDebit );

        if (this.totalCredit < this.totalDebit || this.totalCredit > this.totalDebit) {
          this.form.controls['accountingItems'].setErrors({'incorrect': true});
          this.totalAcc = true;
            console.log('error true');

        } else {

          this.form.controls['accountingItems'].setErrors(null);
          this.totalAcc = false;
          console.log('error false');


        }

         }
      }


    save() {

      console.log(this.form);
      if (this.totalAcc) {
        console.log('Error en las sumas');
        swal('Mensaje!', `La poliza tiene diferencias`, 'warning');

          return;
      }

    }

    cargardatos() {

      this.bankService.getAllAccounts().subscribe(
        result => this.bankAccounts = result
      );
  console.log('get all bank accounts ', this.bankAccounts);

    }

    loadSupplier() {

      this.supplierService.getAllSuppliers().subscribe(
        res => this.suppliers = res
      );
          console.log('Suppliers ', this.suppliers);

        }

}
