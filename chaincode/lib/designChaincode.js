'use strict';

const { Contract } = require('fabric-contract-api');

class DesignChaincode extends Contract {

    async submitDesign(ctx, designID, title, description, files, tags) {
        const design = {
            designID,
            title,
            description,
            files: JSON.parse(files),
            tags: JSON.parse(tags),
            feedback: [],
            status: 'Submitted'
        };
        await ctx.stub.putState(designID, Buffer.from(JSON.stringify(design)));
    }

    async getDesignFeedback(ctx, designID) {
        const designBytes = await ctx.stub.getState(designID);
        if (!designBytes || designBytes.length === 0) {
            throw new Error(`Design ${designID} does not exist`);
        }
        const design = JSON.parse(designBytes.toString());
        return design.feedback;
    }

    async approveDesign(ctx, designID, status, comments) {
        const designBytes = await ctx.stub.getState(designID);
        if (!designBytes || designBytes.length === 0) {
            throw new Error(`Design ${designID} does not exist`);
        }
        const design = JSON.parse(designBytes.toString());
        design.status = status;
        design.feedback.push(comments);

        await ctx.stub.putState(designID, Buffer.from(JSON.stringify(design)));
    }
}

module.exports = DesignChaincode;
