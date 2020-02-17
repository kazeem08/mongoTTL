const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('connected to mongoDB...'))

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    age: Number,
    expiresAt: { type: Date, default: Date.now, expires: 300 },
      
});

const User = mongoose.model('User', mySchema);

app.use(express.json())


app.post('/', async(req, res) => {
    const user = new User({name: 'kazeem', age: 10});
    await user.save()
    res.send('User successfully saved');
});

app.get('/mongo', async(req, res) => {
    const user = await User.find();
    res.send(user);
});


app.listen(4000, () => {
    console.log('listening on port 4000');
})