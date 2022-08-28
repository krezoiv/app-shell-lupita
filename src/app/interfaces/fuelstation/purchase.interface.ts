import { PurchaseOrder } from "src/app/models/purchase/purchaseOrder.model";

export interface PurchaseOrder_I {
    purchaseOrder: PurchaseOrder,
}

export interface ListPurchaseDetailOrder_I {
    listPurchaseOrder : [];
}

export interface totalPurchase_I {
    totalDetailPurchaseOrder : []
}