import { Fuels } from "../infrastructure.model";
import { Store } from "../persons/store.model";
import { Vehicle } from "../persons/vehicle.model";
import { PaymentMethods } from "./paymentMethods.models";

export class PurchaseOrder {

   constructor(
    
   public purchaseOrderId : string,    
   public orderNumber : string,   
   public orderDate: string,   
   public deliveryDate: string,   
   public totalPurchaseOrder : number,   
   public totalIDPPurchaseOrder : number,
   public storeId : Store,   
   public vehicleId : Vehicle,   
   public turn : string,   
   public applied? : boolean,

    ) { }
}

export class DetailPurchaseOrder {

    constructor(
     
    public detailPurchaseOrderId : string,    
    public amount : number,   
    public price: number,   
    public fuelId: Fuels,   
    public purchaseOrderId : PurchaseOrder,   
    public total : number,   
    public idpTotal : number,
    public aplicado : boolean,
    public count? : number,
 
  
 
     ) { }
 }

 export class Purchase {

    constructor(
     
        public deliveryDate : string,
        public totalPurchase : number,
        public invoiceSerie: number,
        public invoiceDocument : number,
        public purchaseOrderId: number,
        public applied : boolean,
        public paymentMethodId : PaymentMethods,
    
  
 
     ) { }
 }