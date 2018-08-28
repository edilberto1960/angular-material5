
export class BankAccount {

    public id: number;
    public nameBank: string;
    public accountNumber: string;
    public address: string;
    public email: string;
    public phone: string;
    public observation: string;
    public balance: number;

}

export class BankTransaction {

    public id: number;
    public date: Date;
    public dateOperation: Date;
    public reference: number;
    public description: String;
    public depositAmount: number;
    public checkAmount: number;
    public balance: number;
    public bank: {};
    public accountingItems: {};
    public suppliers: {};


}

