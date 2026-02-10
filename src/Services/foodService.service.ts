import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodService {
  private foodList: any[] = [
    { id: 1, name: 'Pizza 4 fromages', description: 'Pizza avec 4 fromages' },
    { id: 2, name: 'Classic burger', description: 'Burger classique' },
  ];

  getFoodList() {
    return this.foodList;
  }

  addFood(food: any) {
    const newId =
      this.foodList.length > 0
        ? Math.max(...this.foodList.map((f) => f.id)) + 1
        : 1;
    const newFood = { id: newId, ...food };
    this.foodList.push(newFood);
    return newFood;
  }

  updateFood(id: number, updatedFood: any) {
    const index = this.foodList.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.foodList[index] = { ...this.foodList[index], ...updatedFood };
      return this.foodList[index];
    }
    return null;
  }
}
