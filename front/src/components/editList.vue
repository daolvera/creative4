<template>
<div class="edit">
    <div class="form">
      <input v-model="findDesc" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectTask(s)">{{s.desc}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findTask">
		New Employee
		<input v-model='findTask.name'>
		<p></p>
		New Task Description
		<textarea v-model='findTask.desc' class='body'>
		</textarea>
		<p></p>
		New Priorty
		<textarea v-model='findTask.priority' class='body'>
		</textarea>
		<p></p>
		New Day
		<textarea v-model='findTask.day' class='body'>
		</textarea>
		<p></p>
    </div>
    <div class="actions" v-if="findTask">
      <button @click="editTask(findTask)">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'editList',
  data() {
    return {
		name: "",
		desc:"",
		file: null,
		addTask: null,
		tasks: [],
		findName: "",
		findDesc: "",
		findDay : "",
		findPriority : "",
		findTask: null,
    }
  },
  computed: {
    suggestions() {
      let tasks = this.tasks;
      return tasks.sort((a, b) => a.desc > b.desc);
    },
	GetTasks(){
		return this.tasks;
	}
  },

  created() {
    this.getTasks();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async getTasks() {
      try {
        let response = await axios.get("/api/tasks");
        this.tasks = response.data.tasks;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectTask(task) {
		this.findName = "";
		this.findDesc = "";
		this.findDay = "";
		this.findPriority = "";
		this.findTask = task;
    },
    async editTask(task) {
      try {
        await axios.put("/api/tasks/" + task.id, {
			name: this.findTask.name,
			desc: this.findTask.desc,
			priority: this.findTask.priority,
			day: this.findTask.day,
        });
        this.findTask = null;
        this.getTasks();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  }



}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.edit button{
	border-radius: 5px;
	padding: 10px;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
  display: flex;
  flex-direction: column;
}
.body{
  width: 295px;
  font-style: italic;
  border: 1px solid black;
  text-align: center;
}
.upload{
	margin-top:15px;
	display: flex;
	flex-direction: column;
}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
  border: 1px solid black;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>