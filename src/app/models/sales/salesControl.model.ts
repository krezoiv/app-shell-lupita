import { GeneralDispenserReader } from '../fuelstation/dispensers.model';


export class SalesControl {
    constructor(
        public salesDate: string,
        public noDocument: number,
        public regularPrice: number,
        public superPrice: number,
        public dieselPrice: number,
        public totalGallonRegular: number,
        public totalGallonSuper: number,
        public totalGallonDiesel: number,
        public regularAccumulatedGallons: number,
        public superAccumulatedGallons: number,
        public dieselAccumulatedGallons: number,
        public total: number,
        public balance: number,
        public totalAbonosBalance : number,
        public bills: number,
        public vales: number,
        public cupones: number,
        public vouchers: number,
        public deposits: number, 
        public depositSlip: string,
        public credits: number,
        public applied: boolean,
        public abonos : number,
        public count : number,
        public generalDispenserReaderId : GeneralDispenserReader,
        public userName : string
       

    ) { }
}