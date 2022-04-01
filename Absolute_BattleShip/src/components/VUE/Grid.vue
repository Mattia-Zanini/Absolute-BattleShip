<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <!-- GRID -->
        <div class="col-6">
          <table class="grid">
            <tbody>
              <tr v-for="row in 11" :key="row">
                <td
                  v-for="col in 11"
                  :key="col"
                  :class="[
                    { 'no-border': row == 1 || col == 1 },
                    { 'grid-border': row != 1 && col != 1 },
                  ]"
                >
                  <div class="indicator" v-if="col == 1 && row != 1">{{ rowIndicators[row - 2] }}</div>
                  <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6 ships">
          <div class="row">
            <div class="col-1">
              <h3>1x</h3>
            </div>
            <div class="col-11">
              <div class="row" draggable="true">
                <div v-for="shipLength in 5" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>1x</h3>
            </div>
            <div class="col-11">
              <div class="row" draggable="true">
                <div v-for="shipLength in 4" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>1x</h3>
            </div>
            <div class="col-11">
              <div class="row" draggable="true">
                <div v-for="shipLength in 3" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>3x</h3>
            </div>
            <div class="col-11">
              <div class="row" draggable="true">
                <div v-for="shipLength in 2" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>4x</h3>
            </div>
            <div class="col-11">
              <div class="row" draggable="true">
                <div class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <button class="btn btn-style" @click="$emit('exitPreGame', 0)">Esci</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rowIndicators'],
  data() {
    return {
      shipLength: 0,
    };
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  line-height: 2;
}
</style>

<!--
<tbody>
    <tr v-for="row in grid">
        <td v-for="cell in row" @click="cellClicked(cell)" :class="cell.class">
            <span v-if="cell.ship">
                <i class="fas fa-ship"></i>
            </span>
            <span v-if="cell.miss">
                <i class="fas fa-times"></i>
            </span>
            <span v-if="cell.hit">
                <i class="fas fa-bomb"></i>
            </span>
        </td>
    </tr>
</tbody>
-->