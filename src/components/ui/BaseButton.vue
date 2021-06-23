<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script>
export default {
  props: ["disabled", "outline", "small"],

  computed: {
    classes() {
      return {
        disabled: this.disabled,
        outline: this.outline,
        small: this.small,
      };
    },
  },
};
</script>

<style scoped>
button {
  text-decoration: none;
  /* padding: 0.75rem 1.5rem; */
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

button.disabled {
  background-color: hsl(278, 9%, 25%);
  color: rgb(194, 194, 194);
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.small {
  padding: 0rem 0.5rem 0.15rem;
  font-size: 0.85rem;
  height: 1.5rem;
  border-radius: 5px;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>