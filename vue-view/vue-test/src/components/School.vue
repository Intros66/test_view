<template>
  <div class='p-sty'>
      <h1>我是School组件</h1>
      <button  @click="toParent()">点击向父组件发送消息</button>
      <h2>props： {{ pChild1 }}</h2>
      <Student v-bind="$attrs" v-on="$listeners"></Student>
  </div>
</template>

<script>
import Student from './Student.vue'
export default {
    name: 'School',
    props: ['pChild1'],
    inheritAttrs: false,
    components: {
        Student
    },
    data() {
        return {
            msg: '我是School'
        }
    },
    methods: {
        getSchoolMsg(){
            console.log(this.msg);
        },
        toParent(){
            this.$emit('fromChild', this.msg)
        }
    },
    mounted() {
        this.$emit('test1')
    },
}
</script>

<style scoped>
    .p-sty {
        width: 400px;
        height: 300px;
        background-color: aqua;
    }
</style>