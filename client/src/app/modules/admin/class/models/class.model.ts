export class ClassModel {
    id?: string;
    name: string;
    teacher: string;
    subjects: string[];

    constructor(data?: any) {
        data = data || {};
        data.name = data.name || '';
        data.teacher = data.teacher || '';
        data.subjects = data.subjects || [];
    }
}
