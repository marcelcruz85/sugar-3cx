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
        var status = null;
        var agent =  null;
        var direction = null;

        if (this.cdrJson.fromType == 'Extension') {
            agent = this.cdrJson.fromDn
        } else if (this.cdrJson.fromType == 'Line' && this.cdrJson.toDn == 'smartrouting.Main') {
            agent = this.cdrJson.finalDn
        } else if (this.cdrJson.fromType == 'Line' && this.cdrJson.toDn != 'smartrouting.Main'){
            agent = this.cdrJson.toDn
        }

        if ( this.cdrJson.fromType == 'Extension' && this.cdrJson.toType == 'Line' ) {
            status = 'Completed';
            direction = 'Outbound';
        } else if ( this.cdrJson.fromType == 'Extension' && this.cdrJson.toType == 'LineSet'){
            status = 'NotAnswer';
            direction = 'Outbound';
        } else if ( this.cdrJson.fromType == 'Line' && this.cdrJson.toType == 'VMail'){
            status = 'VoiceMail';
            direction = 'Inbound';
        }

        var data = {
            fromType: this.cdrJson.fromType,
            toType: this.cdrJson.toType,
            direction: direction,
            toNo: this.cdrJson.toNo,
            status: status,
            agent: agent
        }

        var config = {
            method: 'post',
            url: 'https://clgup.nablasol.net/rest/v11_1/cdr-to-call',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        return 123123;
    }
}

module.exports = CDR;