<template>
  <router-link to="/">
    <div class="center">请先登录再浏览</div>
  </router-link>

</template>
<script>
export default {
  name: 'BackLogin',
  data() {
    return {}
  },
  methods: {},
  created() {},
  components: {}
}
</script>
<style>
.center {
  width: 100%;
  height: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
.router-link-active {
  text-decoration: none;
}
</style>
