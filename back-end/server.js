const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/teams', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const taskSchema = new mongoose.Schema({
	name: String,
	desc: String,
	priority: String,
	day: Number,
	date: Date,
});

taskSchema.virtual('id')
	.get(function() {
	return this._id.toHexString();
});
taskSchema.set('toJSON', {
  virtuals: true
});

const Task = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
	try {
	  let tasks = await Task.find();
	  res.send({tasks: tasks});
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task({
    name: req.body.name,
    desc: req.body.desc,
	priority: req.body.priority,
	day: req.body.day,
  });
  try {
    await task.save();
    res.send({task:task});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
	try {
	  await Task.deleteOne({
		_id: req.params.id
	  });
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });

  app.put('/api/tasks/:id', async (req, res) => {
	try {
	  let task = await Task.findOne({
		_id: req.params.id
	  });
	  task.name = req.body.name;
	  task.desc = req.body.desc;
	  task.priority = req.body.priority;
	  task.day = req.body.day;
	  task.save();
	  res.sendStatus(200);
	} catch(error){
	  console.log(error);
	  res.sendStatus(500);
	}
  });

  app.listen(3000, () => console.log('Server listening on port 3000!'));

  
  

  
