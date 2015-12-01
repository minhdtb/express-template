module.exports = {
    development: {
        db: 'mongodb://127.0.0.1/development',
        app: {
            name: ''
        }
    },
    production: {
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: ''
        }
    }
};
