class CDR {
    constructor(cdr){
        this.cdr = cdr;
        this.cdrJson = {
            duration: null,
            timeStart: null,
            timeanswered: null,
            timeEnd: null,
        }
    }
    toJson() {
        this.cdrJson.duration = this.cdr['0'].replace('Call ', '');
        this.cdrJson.timeStart = this.cdr['1'];
        this.cdrJson.timeanswered = this.cdr['2'];
        this.cdrJson.timeEnd = this.cdr['3'];

        return this.cdrJson;
    }
}

module.exports = CDR;