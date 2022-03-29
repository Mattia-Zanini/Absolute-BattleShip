<template>
  <table class="grid">
    <tbody>
      <tr v-for="row in 11" :class="{ 'grid-border': row != 1 }">
        <td v-for="col in 11" :class="{ 'grid-border': col != 1 }"></td>
      </tr>
    </tbody>
  </table>
</template>
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