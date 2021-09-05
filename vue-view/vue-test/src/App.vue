<template>
  <div id="app">
    <button @click="changeUrl">点我修改url，不跳转</button>
    <button @click="changeState">点我更新当前state对象，不跳转</button>
    <School :p-child1="child1" :p-child2="child2" @test1="onTest1" @test2="onTest2" @fromChild="getValFromChild"></School>
  </div>
</template>

<script>
import School from './components/School.vue'


export default {
  name: 'App',
  components: {
    School
  },
  data() {
    return {
      child1: '我是child1',
      child2: '我是child2'
    }
  },
  methods: {
    onTest1(){
      console.log('test1 running');
    },
    onTest2(){
      console.log('test2 running');
    },
    getValFromChild(msg){
      console.log('子组件传过来的值为：' + msg);
    },
    changeUrl(){
      history.pushState(this.child1,null,'hello-world.html')
      console.log(history);
    },
    changeState(){
      history.replaceState(this.child1, null, 'hello-world2.html')
      console.log(history);
    }
  },
}
</script>

<style>

</style>
