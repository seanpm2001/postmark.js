import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Message Statistics', function() {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    const client:postmark.ServerClient = new postmark.ServerClient(serverToken);

    function formattedDate(date: Date):string {
        return '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    it('getDeliveryStatistics', async () => {
        const stats = await client.getDeliveryStatistics();
        expect(stats.InactiveMails).to.be.gte(0);
    });

    it('getSentCounts', async () => {
        const stats:postmark.Models.SentCounts = await client.getSentCounts();
        expect(stats.Sent).to.be.gte(0);
    });

    it('getBounceCounts', async () => {
        const stats:postmark.Models.BounceCounts = await client.getBounceCounts();
        expect(stats).not.to.be.null;
    });

    it('getSpamComplaints', async () => {
        const stats:postmark.Models.SpamCounts = await client.getSpamComplaintsCounts();
        expect(stats.Days.length).to.be.gte(0);
    });

    it('getTrackedEmailCounts', async () => {
        const stats:postmark.Models.TrackedEmailCounts = await client.getTrackedEmailCounts();
        expect(stats.Tracked).to.be.gte(0)
    });

    it('getOutboundOverview', async () => {
        let now:Date = new Date();
        let yesterday:Date = new Date(now.valueOf() - (24 * 3600 * 1000));
        let toDate:string = formattedDate(now);
        let fromDate:string = formattedDate(yesterday);

        const stats:postmark.Models.OutboundStatistics = await client.getOutboundOverview({fromDate: fromDate, toDate: toDate});
        expect(stats.Sent).to.be.gte(0);
    });
});