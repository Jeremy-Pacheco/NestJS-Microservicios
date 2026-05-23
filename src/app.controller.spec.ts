import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const appService = {
    getGatewayInfo: jest.fn().mockReturnValue({ name: 'NestJS Store Gateway' }),
    getAllServices: jest.fn(),
    getUsers: jest.fn(),
    getOrders: jest.fn(),
    getPayments: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return gateway info', () => {
      expect(appController.getGatewayInfo()).toEqual({ name: 'NestJS Store Gateway' });
    });
  });
});
