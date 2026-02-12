import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return health status', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('/api/food', () => {
    it('should return food data from file', async () => {
      const result = await appController.getFoodList();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
    });
  });

  describe('deleteFood', () => {
    it('should return success when deleting an existing food', async () => {
      const fs = require('node:fs/promises');
      jest
        .spyOn(fs, 'readFile')
        .mockResolvedValue(
          JSON.stringify([{ id: 1, name: 'Pizza', description: 'Test' }]),
        );
      jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);

      const result = await appController.deleteFood('1');

      expect(result).toEqual({
        message: 'Food deleted successfully',
        deleted: true,
      });
    });

    it('should return "not found" when deleting a non-existing food', async () => {
      const fs = require('node:fs/promises');
      jest
        .spyOn(fs, 'readFile')
        .mockResolvedValue(
          JSON.stringify([{ id: 1, name: 'Pizza', description: 'Test' }]),
        );

      const result = await appController.deleteFood('99');

      expect(result).toEqual({
        message: 'Food not found',
        deleted: false,
      });
    });
  });
});
