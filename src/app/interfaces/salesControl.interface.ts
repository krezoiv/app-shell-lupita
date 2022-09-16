import { SalesControl } from "../models/sales/salesControl.model";

export interface lastNoDocument_I {
    noDocumentSale : SalesControl
}

export interface SalebyDocument_I {
    salebyDocument : [];
}

export interface SalesByDate_I {
    total : number,
    getData : SalesControl[];

}