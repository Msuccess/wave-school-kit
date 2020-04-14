import { Test, TestingModule } from '@nestjs/testing';
import { PasswordEncrypterService } from './password-encrypter.service';

describe('PasswordEncrypterService', () => {
  let service: PasswordEncrypterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordEncrypterService],
    }).compile();

    service = module.get<PasswordEncrypterService>(PasswordEncrypterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
