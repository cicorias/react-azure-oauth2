module.exports = {
    serverPort: process.env.PORT || 3000,
    jwtSecret: process.env.PASSPORT_COOKIE_SECRET || 'not a good secret',
    cookieSettings: {
        maxAge: 360000
    },
    passportConfig: {
        identityMetadata: process.env.PASSPORT_IDENTITY_METADATA,
        clientID: process.env.PASSPORT_CLIENTID,
        validateIssuer: true,
        passReqToCallback: process.env.PASSPORT_PASSREQCALLBACK === 'true',
        allowMultiAudiencesInToken: false,
        audience: process.env.PASSPORT_AUDIENCE,
        loggingLevel: process.env.PASSPORT_LOGLEVEL, //Logging level. 'info', 'warn' or 'error'.
        clockSkew: process.env.PASSPORT_CLOCKSKEW ? parseInt(process.env.PASSPORT_CLOCKSKEW) : 299
    }
}
