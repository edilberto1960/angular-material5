import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankService } from '../../services/bank/bank.service';
import swal from 'sweetalert';
import { BankAccount } from '../../models/bank.model';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

   form: FormGroup;
   bankaccounts: BankAccount[];

   // tslint:disable-next-line:no-inferrable-types
   total: number = 0;
   // tslint:disable-next-line:no-inferrable-types
   update: boolean = true;

   bankAccount = {
      'id': null,
     'nameBank': '',
     'accountNumber': '',
     'address': '',
     'email': '',
     'phone': '',
     'observation': '',
     'balance': 0.00
   };




  constructor(private fb: FormBuilder,
              private bankService: BankService) {
    this.createForm();
  }

  ngOnInit() {
    this.getAllBankAccounts();
  }

   createForm() {
     this.form = new FormGroup({
        'id': new FormControl(),
       'nameBank': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'accountNumber': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+')]),
       'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       'phone': new FormControl('', Validators.required),
       'address': new FormControl('', Validators.required),
       'observation': new FormControl('', Validators.required),
       'balance': new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)')])

   });

   }

  save() {
     console.log('SAVE ITEMS');

    console.log('THIS FORM: ', this.form);
      // tslint:disable-next-line:prefer-const
      let data = JSON.stringify(this.form.value);
      console.log('-----Team in JSON Format-----');
      console.log(data);
      // tslint:disable-next-line:prefer-const
      let jsonData = JSON.parse(data);
      console.log('jsonData ', jsonData);
      // console.log(jsonData.invoiceItems[0].qty);

       this.create(jsonData);
        }

        updateForm() {
          console.log('UPDATE THIS ITEMS');

         console.log('THIS FORM: ', this.form);
           // tslint:disable-next-line:prefer-const
           let data = JSON.stringify(this.form.value);
           console.log('-----Team in JSON Format-----');
           console.log(data);
           // tslint:disable-next-line:prefer-const
           let jsonData = JSON.parse(data);
           console.log('jsonData ', jsonData);
           // console.log(jsonData.invoiceItems[0].qty);
            this.updateBank(jsonData);

          }



        create(data) {

          this.bankService.create(data).subscribe( res => {
            console.log(res);
             swal('Mensaje del Servidor...', `La cuenta de ${res.nameBank}: ${res.accountNumber} se guardo con exito`, 'success');
             this.form.setValue(this.bankAccount);
             this.getAllBankAccounts();
          },
         error => {
           console.log(error, '  / ', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.accountNumber} ya existe `, 'error');

         }
      );
        }

        updateBank(data) {
          console.log('INSIDE OF UPDATE');

          this.bankService.updateBankAccount(data).subscribe( res => {
            console.log(res);
             swal('Mensaje del Servidor...', `La cuenta de ${res.nameBank}: ${res.accountNumber} se actualizo con exito`, 'success');
             this.bankAccount = {
              'id': null,
             'nameBank': '',
             'accountNumber': '',
             'address': '',
             'email': '',
             'phone': '',
             'observation': '',
             'balance': null
           };
             this.update = true;
             this.form.setValue(this.bankAccount);
             this.getAllBankAccounts();
          },
         error => {
           console.log(error, '  / ', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.accountNumber} ya existe `, 'error');

         }
      );
        }

        getAllBankAccounts() {

          this.bankService.getAllAccounts()
          .subscribe(bankaccounts => {

            // tslint:disable-next-line:semicolon
             this.bankaccounts = bankaccounts
              this.calcTotal();
            }


          );

          }

        calcTotal() {
        this.total = 0.00;
          for ( let i = 0; i < this.bankaccounts.length; i ++) {

            this.total = this.total + this.bankaccounts[i].balance;
        }
        console.log('Total ', this.total);


        }

        select(id) {
        console.log('Id', id);

              this.bankAccount = this.bankaccounts[id - 1];
              console.log('bankAccount ', this.bankAccount);
              this.update = false;
              this.form.setValue(this.bankAccount);

        }



}
