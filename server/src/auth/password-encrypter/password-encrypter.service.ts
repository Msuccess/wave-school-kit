import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

class Bcrypt {
  async hash(password: string, callback: Function) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt, callback);
  }

  async compare(password: string, encrypted: string, callback: Function) {
    return await bcrypt.compare(password, encrypted, callback);
  }
}

@Injectable()
export class PasswordEncrypterService {
  private bcrypt: Bcrypt;

  constructor() {
    this.bcrypt = new Bcrypt();
  }

  async hash(password: string, callback?: Function): Promise<string> {
    try {
      return await this.bcrypt.hash(password, callback);
    } catch (error) {
      throw new HttpException('Error Encrypting Password', error);
    }
  }

  async verify(
    password: string,
    encrypted: string,
    callback?: Function,
  ): Promise<boolean> {
    try {
      return await this.bcrypt.compare(password, encrypted, callback);
    } catch (error) {
      throw new HttpException('Error Decrypting Password', error);
    }
  }
}
