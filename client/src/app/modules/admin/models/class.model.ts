export class classModel {
    id?: string;
    name: string;
    teacher: string;

    constructor(data?: any) {
        data = data || {};
        this.name = data.name || '';
        this.teacher = data.teacher || '';
    }
}
