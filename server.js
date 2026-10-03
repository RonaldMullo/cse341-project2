const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodb = require('./db/connect');

dotenv.config();

const passport = require('./auth/passport');

const app = express();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      withCredentials: true
    }
  })
);

app.get('/', (req, res) => {
  res.send('Psychology Clinic API is running');
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}); 