export class AcademicModel {
    role: string;
    avatar: File;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;

    constructor(data?: any) {
        data = data || {};
        this.role = data.role || 'student';
        this.avatar = data.avatar || '';
        this.email = data.email || '';
        this.phoneNumber = data.phoneNumber || '';
        this.username = data.username || '';
        this.password = data.password || '';
    }
}
