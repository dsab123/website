export class Talk {
    constructor(data = {}) {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.slides = '';
        this.recording = '';
        this.date = '';
        
        Object.assign(this, data);
    }
}