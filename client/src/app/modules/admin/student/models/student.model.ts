export class StudentModel {
    id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    religion: string;
    birthdate: string;
    previousSchool: string;
    level: string;
    term: string;
    specialNeeds: string;

    constructor(data?: any) {
        data = data || {};
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.gender = data.gender || '';
        this.religion = data.religion || '';
        this.birthdate = data.birthdate || '';
        this.previousSchool = data.previousSchool || '';
        this.level = data.level || '';
        this.term = data.term || '';
        this.specialNeeds = data.specialNeeds || '';
    }
}
