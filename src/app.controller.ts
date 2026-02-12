import { Controller, Get, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'path';

@Controller()
export class AppController {
  path = join(process.cwd(), 'src', 'foods', 'data', 'food.json');

  @Get('api/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('api/food')
  async getFoodList() {
    try {
      const foodData = await readFile(this.path, 'utf-8');
      console.log('Food data retrieved successfully', foodData);
      return JSON.parse(foodData);
    } catch (error) {
      console.error('Error reading food data:', error);
      return { error: 'Unable to retrieve food data' };
    }
  }

  @Delete('api/food/:id')
  async deleteFood(@Param('id') id: string) {
    try {
      const foodData = await readFile(this.path, 'utf-8');
      const foods = JSON.parse(foodData);

      const updatedFoods = foods.filter((f: any) => f.id !== parseInt(id));

      if (foods.length === updatedFoods.length) {
        return { message: 'Food not found', deleted: false };
      }

      await writeFile(
        this.path,
        JSON.stringify(updatedFoods, null, 2),
        'utf-8',
      );
      console.log(`Food with id ${id} deleted successfully`);
      return { message: 'Food deleted successfully', deleted: true };
    } catch (error) {
      console.error('Error deleting food data:', error);
      return { error: 'Unable to delete food data' };
    }
  }
}
