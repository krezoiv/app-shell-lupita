import { Fuels } from "../infrastructure.model";
import { Store } from "../persons/store.model";
import { Vehicle } from "../persons/vehicle.model";
import { PaymentMethods } from "./paymentMethods.models";

export class PurchaseOrder {

    constructor(
        public userName : string,
        public purchaseId: Purchase,
        public storeId: Store,
        public vehicleId: Vehicle,
        public purchaseOrderId: string,
        public orderNumber?: string,
        public orderDate?: string,
        public expirationDate?: string,
        public deliveryDate?: string,
        public totalPurchaseOrder?: number,
        public totalIDPPurchaseOrder?: number,
        public turn?: string,
        public totalGallonRegular?: number,
        public totalGallonSuper?: number,
        public totalGallonDiesel?: number,
        public count?: number,
       

    ) { }
}

export class DetailPurchaseOrder {

    constructor(

        public detailPurchaseOrderId: string,
        public amount: number,
        public price: number,
        public fuelId: Fuels,
        public purchaseOrderId: PurchaseOrder,
        public total: number,
        public idpTotal: number,
        public aplicado: boolean,
        public count?: number,



    ) { }
}

export class Purchase {

    constructor(
        public userName : string,
        public deliveryDate: string,
        public totalPurchase: number,
        public invoiceSerie: number,
        public invoiceDocument: number,
        public purchaseOrderId: PurchaseOrder,
        public appliedId: string,
        public paymentMethodId: PaymentMethods,
        public otherPayment: number,
        public otherPaymentDescription: string,
        public bankId: string,
        public NoBankCheck: string,
        public checkAmount: number,
        public couponsAmount: number,
        public orderNumber: number,
        public count?: number,
        public purchaseId?: string,
        public expirationDate?: string
    ) { }
}



