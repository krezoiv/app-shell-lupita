import { FuelInventory } from "src/app/models/fuelstation/fuelInventory.model";


export interface FuelInventoryId_I {
    fuelInventoryId: FuelInventory
};

export interface inventoryCode_I {
    inventoryCode: FuelInventory
};

export interface fuelIdRegular_I {
    fuelIdRegular: FuelInventory
};

export interface fuelIdSuper_I {
    fuelIdSuper: FuelInventory
};

export interface fuelIdDiesel_I {
    fuelIdDiesel: FuelInventory
};



export interface fuelInventoryAmountPending_I {
    fuelInventoryAmountPending: FuelInventory
};

export interface fuelInventoryAvailable_I {
    fuelInventoryAvailable: FuelInventory
};

export interface AmountPending_I {
    fuelInventoryAmountPending: FuelInventory
};

export interface InventroyData_I {
    fuelInventory : [];
}