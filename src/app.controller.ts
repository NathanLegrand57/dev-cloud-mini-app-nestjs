import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FoodService } from './Services/foodService.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private foodService: FoodService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('api/food')
  getFoodList() {
    return this.foodService.getFoodList();
  }

  @Post('api/food')
  addFood(@Body() food: any) {
    return this.foodService.addFood(food);
  }

  @Put('api/food/:id')
  updateFood(@Param('id') id: string, @Body() updatedFood: any) {
    return this.foodService.updateFood(+id, updatedFood);
  }
}
