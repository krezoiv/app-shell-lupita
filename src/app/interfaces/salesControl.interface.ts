import { DetailPurchaseOrder } from "../models/purchase/purchaseOrder.model";
import { SalesControl } from "../models/sales/salesControl.model";

export interface lastNoDocument_I {
    noDocumentSale: SalesControl
}

export interface SalebyDocument_I {
    salebyDocument: [];
}

export interface SalesByDate_I {
    total: number,
    getData: SalesControl[];

}

export interface countTotalSale_I {
    countTotalSale: [];
}

export interface totalSales_I {
    countTotalSale: number;
}

export interface greaterRegularGallons_I {
    greaterRegularGallons: [];
}

export interface lesserRegularGallons_I {
    lesserRegularGallons: [];
}


export interface greaterSuperGallons_I {
    greaterSuperGallon: [];
}

export interface lesserSuperGallons_I {
    lesserSuperGallons: [];
}

export interface greaterDieselGallons_I {
    greaterDieselGallons: [];
}

export interface lesserDieselGallons_I {
    lesserDieselGallons: [];
}

export interface greaterSale_I {
    greaterSale: [];
}

export interface lesserSale_I {
    lersserSale: [];
}

export interface lastSaleControl_I {
    lastSale: []
    noDocument: SalesControl,
    gnrlDispId: SalesControl
}

export interface DeleteSalesControl_I {
    updateAvailiableSuper :SalesControl,
    updateAvailiableRegular :SalesControl,
    updateAvailiableDiesel :SalesControl,
    deleteSale :SalesControl
}

