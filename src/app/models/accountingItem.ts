
      export class AccountingItems {

       id = '';
       account = {};
       concept = '';
       debit = null;
       credit = null;
       total = 0;

     }

     export class Accounting {

      constructor(nameAccount: string, accounting: string) {
        // this.id = id;
        this.nameAccount = nameAccount;
        this.accounting = accounting;
      }
      // id = null;
      // tslint:disable-next-line:no-inferrable-types
      nameAccount: string = '';
      accounting = '';
    }

