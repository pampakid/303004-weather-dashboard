import { weatherService } from './services/api';

// Self-executing async function for testing
(async () => {
    try {
        console.log('Testing weather service connection...');
        
        // Test current weather
        console.log('Fetching current weather for London...');
        const weather = await weatherService.getCurrentWeather('London');
        console.log('Current weather:', weather);
        
        // Test history
        console.log('\nFetching weather history for London...');
        const history = await weatherService.getWeatherHistory('London', 3);
        console.log('Weather history:', history);
        
    } catch (error) {
        console.error('Error testing connection:', error);
    }
})();