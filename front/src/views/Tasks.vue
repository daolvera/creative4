<template>
<div class='wrapper'>
  <div class="individual-menu">
    <div class="menu-header">
      <h3> Add, Remove, or Edit Tasks </h3>
    </div>
		<div class='create'>
			<h2>Create a new Task</h2>
			<form v-if="creating" @submit.prevent="addTask">
				<h3> Name of Employee </h3>
        <div class='name'>
          <input type="radio" id="Daniel" name="name" v-model='name' value="Daniel">
          <label for="Daniel">Daniel</label><br>
          <input type="radio" id="Sadie" name="name" v-model='name' value="Sadie">
          <label for="Sadie">Sadie</label><br>
          <input type="radio" id="Tyler" name="name"  v-model='name' value="Tyler">
          <label for="Tyler">Tyler</label>
          <br>
          <input type="radio" id="Jeffery" name="name" v-model='name' value="Jeffery">
          <label for="Jeffery">Jeffery</label>
          <p></p>
        </div>
        <h3> Priority Level </h3>
        <div class='priority'>
          <input type="radio" id="high" name="priority" v-model='priority' value="high">
          <label for="high">Low</label><br>
          <input type="radio" id="medium" name="priority" v-model='priority' value="medium">
          <label for="medium">Medium</label><br>
          <input type="radio" id="high" name="priority" v-model='priority' value="low">
          <label for="low">Low</label><br>
          <p></p>
        </div>
        <div class='text'>
          <textarea v-model="desc" placeholder="Description"></textarea>
          <textarea v-model="day" placeholder="Day of the Month"></textarea>
        </div>
				<br />
				<button type="submit">Submit</button>
			</form>
			<div v-else>
				<p>Thank You!</p>
				<p><a @click="toggleForm" href="#">Create another Task</a></p>
			</div>
		</div>
  </div>
  <h2> Edit Current Tasks </h2>
  <editList/>
  <h2>Remove Current tasks </h2>
  <taskList/>
</div>
</template>

<script>
import axios from 'axios';
import taskList from "../components/taskList.vue"
import editList from "../components/editList.vue"
export default {
  name: 'Browse',
  components: {
    taskList,
    editList
  },
  data() {
    return {
      creating: true,
      name: '',
      desc: '',
		priority:'',
		day:"",
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addTask() {
      try {
        await axios.post("/api/tasks", {
          name: this.name,
          desc: this.desc,
          priority: this.priority,
          day: this.day,
        });
        this.name = "";
        this.desc = "";
        this.day="";
        this.priority='';
        this.creating = false;
        return true;
      } catch (error) {
        console.log(error);
      }

    },
  }
}
</script>

<style scoped>
.wrapper{
	display:flex;
	flex-direction: column;
  margin-bottom: 10px;
}
.individual-menu{
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  border-bottom: 5px solid #31475e;
}
.menu-list{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.menu-list a{
  font-size: 15px;
  text-decoration: none;
}
.menu-header{
  display: flex;
  font-size: 20px;
  margin-bottom: 10px;
  width: 100%;
  justify-content: center;
}
.name{
  display: flex;
  justify-content: center;
}
.priority{
  display: flex;
  flex-direction: row;
  justify-content: center;
} 
.text{
  display:flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin-left:5%;
  justify-self: center;
  align-self: center;
}
.create{
	display: flex;
	flex-direction: column;
}
.menu-item{
  display: flex;
}

@media (min-width: 768px) {
  .menu-header{
    font-size: 30px;
  }
  .menu-list a{
    font-size: 22px;
  }
}
@media (min-width: 1280px){
  .menu-header{
    font-size: 35px;
  }
  .menu-list a{
    font-size: 28px;
  }
}
</style>