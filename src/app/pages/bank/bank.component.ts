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

   bankAccount = {
      'id': null,
     'nameBank': '',
     'accountNumber': '',
     'address': '',
     'email': '',
     'phone': '',
     'observation': '',
     'balance': ''
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

          for ( let i = 0; i < this.bankaccounts.length; i ++) {

            this.total = this.total + this.bankaccounts[i].balance;
        }
        console.log('Total ', this.total);


        }



}
