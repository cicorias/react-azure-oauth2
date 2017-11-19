const express = require('express')
const app = express()
const passport = require('passport')
const BearerStrategy = require('passport-azure-ad').BearerStrategy
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const serverPort = require('./config').serverPort
const sessionSecret = require('./config').jwtSecret
const cookieSettings = require('./config').cookieSettings

const port = process.env.PORT || serverPort

const errorHandlingMiddleware = require('./error')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: sessionSecret, cookie: cookieSettings }))

// app.use(express.static('./server/static/'))
// app.use(express.static('./client/dist/'))

// require('./server/passport/passport')(passport)

var options = {
    identityMetadata: 'https://login.microsoftonline.com/csenyc.onmicrosoft.com/.well-known/openid-configuration',
    clientID: '45abfc7e-4e11-44ea-8d9a-e0dab00c0e3d',//config.creds.clientID,
    validateIssuer: true,
    issuer: null,
    passReqToCallback: true, //config.creds.passReqToCallback,
    // isB2C: config.creds.isB2C,
    // policyName: config.creds.policyName,
    allowMultiAudiencesInToken: false,
    audience: null,
    loggingLevel: 'info',
    clockSkew: 0, //config.creds.clockSkew,
    // scope: config.creds.scope
  };


passport.use(new BearerStrategy(options, (req, token, done)=>{
    console.log(`running validate function`);
    console.log(JSON.stringify(token))
    var user = {
        oid: token.oid,
        // token: token,
        name: token.unique_name,
        roles: token.roles,
        groups: token.groups,
        surname: token.family_name,
        givenName: token.given_name,

    }
    return done(null, user, token);
}));

app.use(passport.initialize())
app.use(passport.session())

// const authRoutes = require('./server/routes/auth')
// app.use('/auth', authRoutes)


const apiRoutes = require('./api')
/// adds a milisecond...
app.use('/api', passport.authenticate('oauth-bearer', { session: false }), apiRoutes)
app.use('/api2', apiRoutes)

app.use(errorHandlingMiddleware())

app.listen(port, () => {
  console.log('The magic happens on port ' + port)
})
