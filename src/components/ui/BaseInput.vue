<template>
  <label for="the-input">
    <slot name="label" />
  </label>
  <input
    :type="type"
    @input="$emit('update:val', $event.target.value)"
    :min="min"
    :max="max"
    name="the-input"
    keep-alive
    value="val"
  />
</template>

<script>
export default {
  props: ["type", "min", "max", "val"],
};
</script>

<style scoped>
input[type="number"] {
  /* width: 100%; */
  padding: 0.2rem 1rem;
  margin: 0.2rem 1rem;
  /* display: inline-block; */
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline;
}

.error {
  border: 2px solid red !important;
  background-color: rgb(255, 234, 234) !important;
}
</style>