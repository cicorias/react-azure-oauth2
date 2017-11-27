/// ENV setup
const debug = require('debug')('oauth:server')
const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

/// based upon ENV
const port = require('./config').serverPort
const sessionSecret = require('./config').jwtSecret
const cookieSettings = require('./config').cookieSettings
const passportOptions = require('./config.js').passportConfig;

/// express setup
const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

/// passport setup
const passport = require('passport')
const BearerStrategy = require('passport-azure-ad').BearerStrategy

const session = require('express-session')
const errorHandlingMiddleware = require('./error')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: sessionSecret, cookie: cookieSettings }))

passport.use(new BearerStrategy(passportOptions, (req, token, done)=>{
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

const apiRoutes = require('./api')
/// adds a milisecond...
app.use('/api', passport.authenticate('oauth-bearer', { session: false }), apiRoutes)

/// unprotected
app.use('/api2', apiRoutes)

app.use(errorHandlingMiddleware())

app.listen(port, () => {
  console.log('The magic happens on port ' + port)
})
