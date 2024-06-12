'use strict';

const { Contract } = require('fabric-contract-api');

class ComplianceChaincode extends Contract {

    async logAudit(ctx, auditID, auditor, date, findings) {
        const audit = {
            auditID,
            auditor,
            date,
            findings
        };
        await ctx.stub.putState(auditID, Buffer.from(JSON.stringify(audit)));
    }

    async getComplianceData(ctx, complianceID) {
        const complianceBytes = await ctx.stub.getState(complianceID);
        if (!complianceBytes || complianceBytes.length === 0) {
            throw new Error(`Compliance data ${complianceID} does not exist`);
        }
        const compliance = JSON.parse(complianceBytes.toString());
        return compliance;
    }

    async updateComplianceDocument(ctx, documentID, title, date, status) {
        const document = {
            documentID,
            title,
            date,
            status
        };
        await ctx.stub.putState(documentID, Buffer.from(JSON.stringify(document)));
    }
}

module.exports = ComplianceChaincode;
