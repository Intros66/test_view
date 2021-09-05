<template>
  <div class="c-sty">
    <h1>我是Student组件</h1>
    <h2>props： {{ pChild2 }}</h2>
    <h2>attrs: {{ $attrs }}</h2>
    <h2>listeners: {{ $listeners }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  props: ['pChild2'],
  inheritAttrs: false,
  data() {
    return {
      msg: "我是Student"
    };
  },
  methods: {
    getStudentMsg() {
      console.log(this.msg);
    }
  },
  mounted() {
      this.$emit('test2')
  },
};
</script>

<style scoped>
.c-sty {
  width: 400px;
  height: 150px;
  background-color: red;
}
</style>