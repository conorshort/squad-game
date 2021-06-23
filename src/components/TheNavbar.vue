<template>
  <header>
    <nav id="nav" class="flex-container">
      <h1>
        <router-link to="/"> Squad Game </router-link>
      </h1>
      <ul>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
}

header {
  background-color: white;
  height: 80px;
  margin-bottom: 3rem;
}

#nav {
  padding: 30px;
  margin: 0;
  background-color: #b2ff8f;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  h1 {
    a {
      color: black !important;
      text-decoration: none currentcolor solid ;
    }
  }
  ul,
  h1 {
    margin: 0;
  }
}
</style>