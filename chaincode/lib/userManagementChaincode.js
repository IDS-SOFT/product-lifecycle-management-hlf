'use strict';

const { Contract } = require('fabric-contract-api');

class UserManagementChaincode extends Contract {

    async createUser(ctx, userID, name, role, status) {
        const user = {
            userID,
            name,
            role,
            status
        };
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
    }

    async getUser(ctx, userID) {
        const userBytes = await ctx.stub.getState(userID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User ${userID} does not exist`);
        }
        const user = JSON.parse(userBytes.toString());
        return user;
    }

    async updateUserRole(ctx, userID, role) {
        const userBytes = await ctx.stub.getState(userID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User ${userID} does not exist`);
        }
        const user = JSON.parse(userBytes.toString());
        user.role = role;

        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
    }
}

module.exports = UserManagementChaincode;
