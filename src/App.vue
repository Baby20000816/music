<template>
  <div id="app">
    <div class="bottom">
      <Footer></Footer>
    </div>
    <router-view />
  </div>
</template>
<script>
import Footer from '../src/components/Footer'
export default {
  name: 'app',
  components: {
    Footer
  },
  data() {
    return {
      info: JSON.parse(localStorage.getItem('info'))
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-bottom: 60px;
  background-color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.bottom {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 99;
}
</style>
