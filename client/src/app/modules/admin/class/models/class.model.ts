export class ClassModel {
    id?: string;
    name: string;
    teacher: string;
    subjectIds: string[];

    constructor(data?: any) {
        data = data || {};
        data.name = data.name || '';
        data.teacher = data.teacher || '';
        data.subjectIds = data.subjectIds || [];
    }
}
