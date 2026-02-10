import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodService } from './Services/foodService.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FoodService],
})
export class AppModule {}
