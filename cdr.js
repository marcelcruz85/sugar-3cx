class CDR {
    constructor(cdr){
        this.cdr = cdr;
        this.cdrJson = {
            duration: null,
            timeStart: null,
            timeAnswered: null,
            timeEnd: null,
        }
    }
    toJson() {
        this.cdrJson.duration = this.cdr['0'].replace('Call ', '');
        this.cdrJson.timeStart = this.cdr['1'] ? new Date( this.cdr['1'] ).toISOString() : null;
        this.cdrJson.timeAnswered = this.cdr['2'] ? new Date( this.cdr['2'] ).toISOString() : null;
        this.cdrJson.timeEnd = this.cdr['3'] ? new Date( this.cdr['3'] ).toISOString() : null;

        return this.cdrJson;
    }
}

module.exports = CDR;