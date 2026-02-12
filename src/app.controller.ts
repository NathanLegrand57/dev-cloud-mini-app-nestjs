import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { readFile } from 'node:fs/promises';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('api/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('api/food')
  async getFoodList() {
    try {
      const path = join(process.cwd(), 'src', 'foods', 'data', 'food.json');
      const foodData = await readFile(path, 'utf-8');
      console.log('Food data retrieved successfully', foodData);
      return JSON.parse(foodData);
    } catch (error) {
      console.error('Error reading food data:', error);
      return { error: 'Unable to retrieve food data' };
    }
  }
}
