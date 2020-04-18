<template>
  <div id="app">
  <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
	height: 100vh;
}
body * {
	max-height: 100vh;
	word-wrap: break-word;
}
</style>
