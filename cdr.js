class CDR {
    constructor(cdr){
        this.cdr = cdr.toString().split(',');
        this.cdrJson = {
            duration: null
        }
    }
    toJson() {
        this.cdrJson.duration = this.cdr['0'];

        return this.cdrJson;
    }
}

module.exports = CDR;