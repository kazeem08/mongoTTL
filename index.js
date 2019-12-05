const express = require('express');
const app = express();
const mongoose = require('mongoose');
// var ttl = require('mongoose-ttl');


mongoose.connect('mongodb://localhost/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('connected to mongoDB...'))

// var mySchema = new Schema({..});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mySchema = new Schema({
    name: String,
    age: Number,
    expiresAt: { type: Date, default: Date.now, expires: 300 },
      
});

console.log(Date.now())

// const tt = 60000
// mySchema.plugin(ttl, { ttl: tt });

// mySchema.virtual('ttl').set(function(ms) {
//     this.expiresAt = new Date(Date.now() + ms);
// });

// mySchema.virtual('ttl').get(function() {
//     return this.expiresAt - Date.now();
// });

const User = mongoose.model('User', mySchema);
//   const User = new mySchema({
//       ttl: 5000// expire time in milliseconds
//   });


app.use(express.json())


app.get('/', async(req, res) => {
    const user = new User({name: 'kazeem', age: 10});
    await user.save()
    res.send('hello');
});

app.get('/mongo', async(req, res) => {
    // const user = new User({name: 'kazeem', age: 10});
    const user = await User.find();
    res.send(user);
});


app.listen(4000, () => {
    console.log('listening on port 4000')
})