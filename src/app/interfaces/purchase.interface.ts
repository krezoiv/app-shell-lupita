import { DetailPurchaseOrder, Purchase, PurchaseOrder } from "src/app/models/purchase/purchaseOrder.model";

//interface gert purchaseOrderId
export interface PurchaseOrder_I {
    purchaseOrderId: PurchaseOrder,
}

export interface PurchaseId_I {//
    getIdPurchase: Purchase,
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
    getData : PurchaseOrder[];

}

export interface countTotalPurchase_I {
    countTotalPurchase : [];
};

export interface countTotalPurchaseRegular_I {
    countTotalPurchaseRegular: []
};

export interface countTotalPurchaseSuper_I {
    countTotalPurchaseSuper: []
};

export interface countTotalPurchaseDiesel_I {
    countTotalPurchaseDiesel: []
};

export interface GreatePurchase_I {
    greatePurchase: [];
};

export interface LesserPurchase_I {
    lesserPurchase: [];
};

export interface GreaterRegularPurchase_I {
    greaterRegularPurchase: [];
};

export interface LesserRegularPurchase_I {
    lesserRegularPurchase: [];
};

export interface GreaterSuperPurchase_I {
    greaterSuperPurchase :[];
};

export interface LesserSuperPurchase_I {
    lesserSuperPurchase :[];
};


export interface GreaterDieselPurchase_I {
    greaterDieselPurchase : [];
};

export interface LesserDieselPurchase_I {
    lesserDieselPurchase : [];
};

export interface PurchaseByNoOrder_I{
    purchaseByOrder : [];
}

