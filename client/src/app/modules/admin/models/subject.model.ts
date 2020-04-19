export class SubjectModel {
    id?: string;
    name: string;
    subjectCode: string;

    constructor(data?: any) {
        data = data || {};
        this.name = data.name || '';
        this.subjectCode = data.subjectCode || '';
    }
}
