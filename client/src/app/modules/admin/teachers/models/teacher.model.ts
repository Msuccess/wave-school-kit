export class TeacherModel {
    id?: string;
    levelId: string;
    username: string;
    email: string;
    password: string;
    phonenumber: string;
    firstname: string;
    lastname: string;
    gender: string;
    religion: string;

    constructor(data?: any) {
        data = data || {};
        this.levelId = data.levelId || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.phonenumber = data.phonenumber || '';
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.gender = data.gender || '';
        this.religion = data.religion || '';
    }
}


export class UpdateTeacherModel {
    id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    religion: string;
    user: {
        id: string;
        levelId: string;
        username: string;
        email: string;
        password: string;
        phonenumber: string;
        avatar: string; //Change later on
    };

    constructor(data?: any) {

        data = data || {};

        this.user.levelId = data.levelId || '';
        this.user.username = data.username || '';
        this.user.email = data.email || '';
        this.user.password = data.password || '';
        this.user.phonenumber = data.phonenumber || '';
        this.user.avatar = data.avatar || '';

        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.gender = data.gender || '';
        this.religion = data.religion || '';
    }
}
