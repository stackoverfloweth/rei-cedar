<template>
  <div data-backstop="cards">
    <simple-card />
    <hr>
    <div v-for="palette in availablePalettes">
      <div :class="palette">
        <complex-card :palette="palette" @cdr-card-clicked="handleCardClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import simpleCard from 'componentsdir/card/examples/demo/simpleCard.vue';
import complexCard from 'componentsdir/card/examples/demo/complexCard.vue';

export default {
  name: 'Cards',
  components: {
    simpleCard,
    complexCard,
  },
  computed: {
    availablePalettes() { //iterate over some fake palettes
        return ['default', 'dark'] 
    },
  }
};

</script>
