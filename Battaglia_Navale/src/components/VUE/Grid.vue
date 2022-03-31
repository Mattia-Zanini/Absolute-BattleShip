<template>
  <table class="grid">
    <tbody>
      <tr v-for="row in 11">
        <td
          v-for="col in 11"
          :class="[
            { 'no-border': row == 1 || col == 1 },
            { 'grid-border': row != 1 && col != 1 },
          ]"
        >
          <div class="indicator" v-if="col == 1 && row != 1">
            {{ rowIndicators[row - 2] }}
          </div>
          <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      rowIndicators: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    };
  },
};
</script>

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