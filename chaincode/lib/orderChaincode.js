'use strict';

const { Contract } = require('fabric-contract-api');

class OrderChaincode extends Contract {

    async createOrder(ctx, orderID, items) {
        const order = {
            orderID,
            items: JSON.parse(items),
            status: 'Created'
        };
        await ctx.stub.putState(orderID, Buffer.from(JSON.stringify(order)));
    }

    async updateShipmentStatus(ctx, shipmentID, status, trackingNumber) {
        const shipment = {
            shipmentID,
            status,
            trackingNumber
        };
        await ctx.stub.putState(shipmentID, Buffer.from(JSON.stringify(shipment)));
    }

    async confirmDelivery(ctx, orderID, delivery) {
        const orderBytes = await ctx.stub.getState(orderID);
        if (!orderBytes || orderBytes.length === 0) {
            throw new Error(`Order ${orderID} does not exist`);
        }
        const order = JSON.parse(orderBytes.toString());
        order.delivery = delivery;

        await ctx.stub.putState(orderID, Buffer.from(JSON.stringify(order)));
    }
}

module.exports = OrderChaincode;
