export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    token: process.env.APP_TOKEN,
});