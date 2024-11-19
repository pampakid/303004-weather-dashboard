// Weather types that match our backend responses
export interface WeatherData {
    location: string;
    temperature: {
        current: number;
        feels_like: number;
        min: number;
        max: number;
    };
    humidity: number;
    wind: {
        speed: number;
        direction: number;
    };
    description: string;
    timestamp: string;
}

export interface WeatherError {
    error: string;
    type?: string;
    details?: string;
}

// Update api.ts to use these types
export interface WeatherResponse {
    data: WeatherData;
    error?: WeatherError;
}