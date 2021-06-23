<template>
  <div class="home">
    <InputScores /> 
    <ScoreTable />
  </div>
</template>

<script>
// @ is an alias to /src
import InputScores from '@/components/scores/InputScores.vue';
import ScoreTable from '@/components/score-table/ScoreTable.vue';


export default {
  name: 'Home',
  components: {
    InputScores,
    ScoreTable,
  },
  computed: {

  }
};
</script>
