const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 8083;

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle url encoded data
//data which user enters in a form
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json data
app.use(express.json());

//Routes
app.use('/api/books', require('./routes/api/books'));
app.use('/books', require('./routes/api/books'));

// Export for Vercel serverless
module.exports = app;

// Only listen when not in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
