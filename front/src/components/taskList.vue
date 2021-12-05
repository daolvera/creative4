<template>
	<div class="wrapper">
		<div class="todoItems">
			<div v-for="task in tasks" v-bind:key="task.id">
				<div class='info'>
					<div class='header'>
						<h2>{{task.name}}</h2>
						<button @click='deleteTask(task)'> Delete Task </button>
					</div>
					<div class='desc'>
						<p>{{task.desc}} -- </p>
						<p>{{month}} / {{task.day}}</p>
					</div>
					<div v-bind:class='{"high": task.priority === "high","medium": task.priority === "medium","low": task.priority === "low",}'>
						<h4> {{task.priority}} </h4>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'TodoList',
	data(){
		return {
			tasks: [],
			filtered:[],
			month: 12,
			checkName: "Daniel",
			name: "",
			desc: "",
			priority: "",
			day: "",
		}
	},
	created() {
		this.getTasks();
	},
	methods: {
		async getTasks() {
			try {
				let response = await axios.get("/api/tasks");
				this.tasks = response.data.tasks;
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editTask(task) {
			try {
				await axios.put("/api/tasks/" + task.id, {
				name: this.name,
				desc: this.desc,
				priority: this.priority,
				day: this.day,
				});
				this.getItems();
				return true;
			} catch (error) {
				console.log(error);
				console.log(this.name);
			}
		},
		async deleteTask(task) {
			try {
				await axios.delete("/api/tasks/" + task.id);
				this.getTasks();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		select(name) {
			this.checkName = name;
			console.log(this.checkName);
		},
	},
}
</script>

<style scoped>
.individual-menu{
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  border-bottom: 5px solid #31475e;
}
.menu-list{
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
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
.header button{
	margin: 5px;
	border-radius: 5px;
	padding: 10px;
}
.menu-item{
  display: flex;
}

.task{
	border: 1px solid black;
}
.info{
	border-bottom: 1px solid black;
	display:flex;
	flex-direction: column;

}
.low{
	display: flex;
	justify-content: center;
	background-color: green;
}
.medium{
	display: flex;
	justify-content: center;
	background-color: orange;
}
.high{
	display: flex;
	justify-content: center;
	background-color: red;
}
.header{
	display: flex;
	justify-content: center;
}
.desc{
	display: flex;
	justify-content: space-around;
	align-content: center;
}
.check{
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	width: 30%;
}
@media (min-width: 768px) {
	.todoItems{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.todoItem{
		width: 45%;
		margin-top: 20px;
		font-size: 18px;
		margin-bottom: 20px;
	}
	.menu-header{
    font-size: 30px;
	}
	.menu-list a{
		font-size: 22px;
	}
}
@media (min-width: 1280px){
	.todoItem{
		width: 30%;
		font-size: 22px;
	}
	.menu-header{
		font-size: 35px;
	}
	.menu-list a{
		font-size: 28px;
	}
}
</style>