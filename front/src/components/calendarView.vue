<template>
	<div class="wrapper">
		<div class="calendar">
			<div class="calendar-day" v-for="currDay in 31" :key="currDay">
				<div class="calendar-date">
					<p> {{currDay}}</p>
				</div>
				<div class="todoItems" id="1">
					<div class="todoItem" v-for="task in tasks" :key="task.id">
						<div class="task" v-if="currDay === task.day">
							<div v-bind:class='{"high": task.priority === "high","medium": task.priority === "medium","low": task.priority === "low", "Daniel": task.name === "Daniel", "Sadie": task.name === "Sadie", "Tyler": task.name === "Tyler","Jeffery": task.name === "Jeffery", }'>
								<a href="#1" @click="alert(task.name, task.desc, task.day )"> {{task.desc}}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'CalendarView',
	data(){
		return {
			tasks: [],
		}
	},
	created() {
		this.getTasks();
	},
	methods:{
		alert(name, desc, date){
			this.$alert(date +" - " + desc, name);
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
	}

}
</script>

<style scoped>

.calendar{
	display: flex;
	flex-wrap: wrap;
	margin: 5px;
	margin-bottom: 15px;
	justify-content: center;
}
.calendar-day{
	display: flex;
	width: 150px;
	height: 150px;
	border: 1px solid black;
	padding: 5px;
}
.calendar-date{
	display: flex;
	height: 20px;
	justify-content: center;
	align-items: center;
}
.todoItems{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

}
.todoItem{
	display: flex;
	justify-content: center;
}
.task{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 75px;
	border:1px solid black;
	height: 40px;
	padding: 1px;
	font-size: 12px;
}
.task a{
	text-decoration: none;
}
.Tyler, .Sadie, .Daniel, .Jeffery{
	height: 40px;
	justify-content: center;
	align-items: center;

}
.Tyler{
	background-color: rgb(0, 128, 255, .2);
}
.Sadie{
	background-color: rgb(255, 102, 255, .2);
}
.Daniel{
	background-color: rgb(0, 204, 0, .2);
}
.Jeffery{
	background-color: rgb(255, 255, 51, .2);
}
.info{
	display:flex;
	flex-direction: column;

}
.low{
	display: flex;
	justify-content: center;
	color: green;
}
.low a{
	color: green;
}
.medium{
	display: flex;
	justify-content: center;
}
.medium a{
	color: orange;
}
.high{
	display: flex;
	justify-content: center;
	color: red;
}
.high a{
	color: red;
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
@media (min-width: 768px) {
	.calendar-day{
		width: 250px;
		height: 250px;
	}
	.calendar-date{
		height: 25px;
		font-size: 23px;
	}
	.todoItems{
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		margin-top: 30px;
	}
	.task{
		width: 200px;
		height: 40px;
		font-size: 18px;
		margin-bottom: 5px;
	}
	.Tyler, .Sadie, .Daniel, .Jeffery{
		width: 100%;
	}
}
@media (min-width: 1280px){

}
</style>