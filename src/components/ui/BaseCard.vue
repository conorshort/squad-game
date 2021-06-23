<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  width: 60%;
  margin: auto;
  border: 2px solid rgb(124, 124, 124);
  border-radius: 5px;
  box-shadow: 2px 2px 5px #80808086;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>