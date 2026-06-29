import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather() {
    return this.weatherService.getWeather();
  }

  @Get('message')
  async getWeatherMessage() {
    return {
      message: await this.weatherService.getWeatherMessage(),
    };
  }
}