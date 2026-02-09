import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getError(): string {
    try {
      throw new Error('This is a test error');
    } catch (error) {
      console.error('An error occurred:', error.message);
      return 'An error occurred. Please check the logs for details.';
    }
  }
}
