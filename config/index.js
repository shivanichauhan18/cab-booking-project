let dev_db_url = 'mongodb://localhost:27017/cab-project';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

module.exports =mongoDB