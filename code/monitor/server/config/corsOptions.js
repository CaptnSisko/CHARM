// TODO: Add production server domain to the whitelist

const corsWhitelist = new Set([
    'http://127.0.0.1:5500/',
    'http://localhost:3001/',
    'https://ece445charm.netlify.app/',
    'https://deploy-preview-18--ece445charm.netlify.app/',
    'https://deploy-preview-19--ece445charm.netlify.app/',
    'https://deploy-preview-20--ece445charm.netlify.app/'
])
const corsOptions = {
    origin: (origin, callback) => {
        if (origin in corsWhitelist || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Origin not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions