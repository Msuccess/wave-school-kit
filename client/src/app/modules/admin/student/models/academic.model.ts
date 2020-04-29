export class AcademicModel {
    role: string;
    avatar: string;
    email: string;
    telephone: string;
    occupation: string;
    address: string;
    telephone: string;

    constructor(data?: any) {
        data = data || {};
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.gender = data.gender || '';
        this.relation = data.relation || '';
        this.occupation = data.occupation || '';
        this.address = data.address || '';
        this.telephone = data.telephone || '';
    }
}
