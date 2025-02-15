interface Config {
  API_URL: string;
}

const development: Config = {
  API_URL: 'http://localhost:5000'
};

const production: Config = {
  API_URL: process.env.VITE_API_URL || 'https://your-backend-domain.com'
};

const config: Config = process.env.NODE_ENV === 'production' ? production : development;

export default config; 