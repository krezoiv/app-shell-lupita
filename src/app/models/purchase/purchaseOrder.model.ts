import { Fuels } from "../infrastructure.model";

export class PurchaseOrder {

   constructor(
    
   public purchaseOrderId : string,    
   public orderNumber : string,   
   public orderDate: string,   
   public deliveryDate: string,   
   public totalPurchaseOrder : number,   
   public storeId : string,   
   public vehicleId : string,   
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
    public count? : number
  
 
     ) { }
 }