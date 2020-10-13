const axios = require('axios');

class CDR {
    constructor(cdr) {
        this.cdr = cdr;
        this.cdrJson = {
            duration: null,
            timeStart: null,
            timeAnswered: null,
            timeEnd: null,
            fromNo: null,
            toNo: null,
            fromType: null,
            toType: null,
            finalType: null,
            reasonTerminated: null,
            historyId: null,
            callId: null,
            dialNo: null,
            finalNumber: null,
            chain: null,
            missedQueueCalls: null,
            fromDn: null,
            toDn: null,
            reasonChanged: null,
            finalDn: null,
            billRate: null,
            billCost: null,
            billName: null,
            fromDispname: null,
            toDispname: null,
            finalDispname: null,
            billCode: null
        }
    }
    toJson() {
        this.cdrJson.duration = this.cdr['0'].replace('Call ', '');
        this.cdrJson.timeStart = this.cdr['1'] ? new Date(this.cdr['1']).toISOString() : null;
        this.cdrJson.timeAnswered = this.cdr['2'] ? new Date(this.cdr['2']).toISOString() : null;
        this.cdrJson.timeEnd = this.cdr['3'] ? new Date(this.cdr['3']).toISOString() : null;
        this.cdrJson.fromNo = this.cdr['4'];
        this.cdrJson.toNo = this.cdr['5'];
        this.cdrJson.fromType = this.cdr['6'];
        this.cdrJson.toType = this.cdr['7'];
        this.cdrJson.finalType = this.cdr['8'];
        this.cdrJson.reasonTerminated = this.cdr['9'];
        this.cdrJson.historyId = this.cdr['10'];
        this.cdrJson.callId = this.cdr['11'];
        this.cdrJson.dialNo = this.cdr['12'];
        this.cdrJson.finalNumber = this.cdr['13'];
        this.cdrJson.chain = this.cdr['14'];
        this.cdrJson.missedQueueCalls = this.cdr['15'];
        this.cdrJson.fromDn = this.cdr['16'];
        this.cdrJson.toDn = this.cdr['17'];
        this.cdrJson.reasonChanged = this.cdr['18'];
        this.cdrJson.finalDn = this.cdr['19'];
        this.cdrJson.billRate = this.cdr['20'];
        this.cdrJson.billCost = this.cdr['21'];
        this.cdrJson.billName = this.cdr['22'];
        this.cdrJson.fromDispname = this.cdr['23'];
        this.cdrJson.toDispname = this.cdr['24'];
        this.cdrJson.finalDispname = this.cdr['25'];
        this.cdrJson.billCode = this.cdr['26'];

        return this.cdrJson;
    }

    createCallLog() {

        var https = require('follow-redirects').https;
        var fs = require('fs');

        var options = {
            'method': 'GET',
            'hostname': 'clgup.nablasol.net',
            'path': '/rest/v11_1/cdr-to-call',
            'headers': {
                'Content-Type': 'application/json'
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        var postData = JSON.stringify({
            "duration": "00:00:24",
            "timeStart": "2020-10-11T20:39:13.000Z",
            "timeAnswered": "2020-10-11T20:39:16.000Z",
            "timeEnd": "2020-10-11T20:39:41.000Z",
            "fromNo": "Ext.141",
            "toNo": "Ext.314",
            "fromType": "Extension",
            "toType": "Extension",
            "finalType": "ConfPlace",
            "reasonTerminated": "TerminatedBySrc",
            "historyId": "3268379",
            "callId": "00000175196381E2_549589",
            "dialNo": "314",
            "finalNumber": "Ext.990",
            "chain": "Chain: Ext.141;Ext.314;Ext.990;",
            "missedQueueCalls": "",
            "fromDn": "141",
            "toDn": "314",
            "reasonChanged": "ReplacedSrc",
            "finalDn": "990",
            "billRate": "",
            "billCost": "",
            "billName": "",
            "fromDispname": "Marcel Cruz",
            "toDispname": "Mariana Tamborrel",
            "finalDispname": "",
            "billCode": "\r\n"
        });

        req.write(postData);

        req.end();

        return 123123;
    }
}

module.exports = CDR;