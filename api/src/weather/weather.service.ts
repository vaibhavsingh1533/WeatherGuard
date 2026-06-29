import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather() {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');

    const city = 'Bhopal';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    const data = response.data;

    return {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
    };
  }

  async getWeatherMessage() {
    const weather = await this.getWeather();

    return `
🌤 Weather Alert

📍 City: ${weather.city}
🌡 Temperature: ${weather.temperature}°C
💧 Humidity: ${weather.humidity}%
☁ Condition: ${weather.condition}

Stay safe and have a great day!
`;
  }
}