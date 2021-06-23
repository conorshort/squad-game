<template>
  <td class="wide" :class="{highlight: highlight}">
    <span class="bid">({{ bid }})</span>  {{ tricks }}
  </td>
  <td class="narrow" :class="{highlight: highlight}"><b>{{ total }}</b></td>
</template>

<script>
export default {
  props: ["bid", "tricks", "total", "highlight"],
};
</script>

<style>
.bid {
  font-style: italic;
  padding: 2px;
}

.wide {
  width: 4rem;
}

.narrow {
  width: 2.5rem;
}

.highlight{
  background: rgba(145, 88, 145, 0.164);
}
</style>