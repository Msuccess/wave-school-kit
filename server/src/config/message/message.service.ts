import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  successMessage = 'Operation successfull';
  failMessage = 'Operation failed';
  noIdFound = 'No id found';
  userAlreadyExist = 'User already exist';
  noDataFound = 'No data found';
  registerMessage = 'Registration successful';
  logInMessage = 'Login successful';
  logInFail = 'Username or password incorrect';
}
