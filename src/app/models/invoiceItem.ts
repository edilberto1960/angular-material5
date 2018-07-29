
      export class InvoiceItem {

        id = '';
        account = {};
        concept = '';
        debit = 0;
       credit = 0.00;
       total = 0;

     }

     export class Accounting {

      constructor(name: string, accounting: string) {
        // this.id = id;
        this.name = name;
        this.accounting = accounting;
      }
      // id = null;
      // tslint:disable-next-line:no-inferrable-types
      name: string = '';
      accounting = '';
    }

