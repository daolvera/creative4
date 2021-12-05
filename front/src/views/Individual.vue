<template>
<div class='wrapper'>
  <div class="individual-menu">
    <div class="menu-header">
      <p> Sort By Employee </p>
    </div>
  </div>
  <todoList/>
</div>
</template>

<script>
import todoList from "../components/todoList.vue"
export default {
  name: 'Browse',
  components: {
    todoList
  },
  data() {
    return {
      name: 'Daniel',
      tasks: [],
      checkName: "Daniel",
      month: 12
    }
  },
  methods: {
    select(name) {
      this.name = name;
    },
  }
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
  margin-bottom: 0px;
  width: 100%;
  justify-content: center;
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