import { DetailPurchaseOrder, Purchase, PurchaseOrder } from "src/app/models/purchase/purchaseOrder.model";

export interface PurchaseOrder_I {
    purchaseOrderId: PurchaseOrder,
}

export interface ListPurchaseDetailOrder_I {
    listPurchaseOrder : [];
}

export interface totalPurchase_I {
    totalDetailPurchaseOrder : []
}

export interface infoPurchaseOrder_I {
    infoPurchaseOrder: PurchaseOrder,
}

export interface detailPurchaseOderInfo_I {
    detailPurchaseOderInfo : [];
}

export interface totalDetailIDPPurchaseOrder_I {
    totalDetailIDPPurchaseOrder : []
}


export interface AmountFuel_I {
    amountFuel: DetailPurchaseOrder,
}

export interface AmountFuelRegular_I {
    amountFuelRegular: DetailPurchaseOrder,
}

export interface AmountFuelSuper_I {
    amountFuelSuper: DetailPurchaseOrder,
}

export interface AmountFuelDiesel_I {
    amountFuelDiesel: DetailPurchaseOrder,
}

export interface PurchaseByDate_I {
    total : number,
    getData : Purchase[];

}