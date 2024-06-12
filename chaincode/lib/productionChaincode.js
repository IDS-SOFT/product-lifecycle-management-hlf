'use strict';

const { Contract } = require('fabric-contract-api');

class ProductionChaincode extends Contract {

    async recordProductionStep(ctx, stepID, planID, description, responsible, date) {
        const step = {
            stepID,
            planID,
            description,
            responsible,
            date
        };
        await ctx.stub.putState(stepID, Buffer.from(JSON.stringify(step)));
    }

    async logQualityCheck(ctx, inspectionID, product, date, findings, result) {
        const qualityCheck = {
            inspectionID,
            product,
            date,
            findings,
            result
        };
        await ctx.stub.putState(inspectionID, Buffer.from(JSON.stringify(qualityCheck)));
    }

    async resolveIssue(ctx, issueID, resolution, status, date) {
        const issueBytes = await ctx.stub.getState(issueID);
        if (!issueBytes || issueBytes.length === 0) {
            throw new Error(`Issue ${issueID} does not exist`);
        }
        const issue = JSON.parse(issueBytes.toString());
        issue.resolution = resolution;
        issue.status = status;
        issue.date = date;

        await ctx.stub.putState(issueID, Buffer.from(JSON.stringify(issue)));
    }
}

module.exports = ProductionChaincode;
