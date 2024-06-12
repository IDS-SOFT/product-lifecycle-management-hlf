'use strict';

const { Contract } = require('fabric-contract-api');

class InventoryChaincode extends Contract {

    async updateInventory(ctx, itemID, quantity) {
        const inventory = {
            itemID,
            quantity: parseInt(quantity, 10)
        };
        await ctx.stub.putState(itemID, Buffer.from(JSON.stringify(inventory)));
    }

    async getInventory(ctx, itemID) {
        const inventoryBytes = await ctx.stub.getState(itemID);
        if (!inventoryBytes || inventoryBytes.length === 0) {
            throw new Error(`Item ${itemID} does not exist`);
        }
        const inventory = JSON.parse(inventoryBytes.toString());
        return inventory;
    }
}

module.exports = InventoryChaincode;
