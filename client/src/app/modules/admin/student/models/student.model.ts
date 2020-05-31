export class StudentModel {
    id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    religion: string;
    birthdate: string;
    levelId: string;
    term: string;
    special_needs: string;
    user: string;
    avatar: string;
    previous_school: string;
    guardianId: string;
    phonenumber: string;
    username: string;
    email: string;
    password: string;

    constructor(data?: any) {
        data = data || {};
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.gender = data.gender || '';
        this.religion = data.religion || '';
        this.birthdate = data.birthdate || '';
        this.levelId = data.levelId || '';
        this.term = data.term || '';
        this.special_needs = data.special_needs || '';
        this.avatar = data.avatar || '';
        this.previous_school = data.previous_school || '';
        this.guardianId = data.guardianId || '';
        this.phonenumber = data.phonenumber || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.user = data.user || '';
    }
}
