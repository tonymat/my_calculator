import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showWeather, setShowWeather] = useState(false);

    // OpenWeatherMap API key - you'll need to replace this with your own
    // Get free API key from: https://openweathermap.org/api
    const API_KEY = 'YOUR_API_KEY_HERE';

    const fetchWeather = async () => {
        setLoading(true);
        setError('');

        try {
            // Get user's location using browser geolocation
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Fetch weather data from OpenWeatherMap
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }

                    const data = await response.json();
                    setWeather(data);
                    setShowWeather(true);
                    setLoading(false);
                },
                (error) => {
                    setError('Location permission denied. Please enable location access.');
                    setLoading(false);
                }
            );
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleWeatherClick = () => {
        if (!weather) {
            fetchWeather();
        } else {
            setShowWeather(!showWeather);
        }
    };

    return (
        <>
            <button
                onClick={handleWeatherClick}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
            >
                {loading ? (
                    '⏳'
                ) : (
                    <>
                        🌤️ {weather ? `${Math.round(weather.main.temp)}°C` : 'Weather'}
                    </>
                )}
            </button>

            {showWeather && weather && !loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '20px',
                        background: 'rgba(0, 0, 0, 0.95)',
                        border: '2px solid #667eea',
                        borderRadius: '20px',
                        padding: '20px',
                        color: '#fff',
                        zIndex: 1000,
                        minWidth: '250px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                            {weather.name}, {weather.sys.country}
                        </h3>
                        <button
                            onClick={() => setShowWeather(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ fontSize: '3rem' }}>
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div>
                            <div style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>
                                {weather.weather[0].description}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#aaa' }}>
                                Feels like {Math.round(weather.main.feels_like)}°C
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
                        <div>
                            <div style={{ color: '#667eea', fontWeight: '600' }}>Humidity</div>
                            <div>{weather.main.humidity}%</div>
                        </div>
                        <div>
                            <div style={{ color: '#667eea', fontWeight: '600' }}>Wind Speed</div>
                            <div>{weather.wind.speed} m/s</div>
                        </div>
                        <div>
                            <div style={{ color: '#667eea', fontWeight: '600' }}>Pressure</div>
                            <div>{weather.main.pressure} hPa</div>
                        </div>
                        <div>
                            <div style={{ color: '#667eea', fontWeight: '600' }}>Visibility</div>
                            <div>{(weather.visibility / 1000).toFixed(1)} km</div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '20px',
                        background: '#ff4444',
                        borderRadius: '15px',
                        padding: '15px',
                        color: '#fff',
                        zIndex: 1000,
                        maxWidth: '250px',
                    }}
                >
                    {error}
                </div>
            )}
        </>
    );
};

export default Weather;
