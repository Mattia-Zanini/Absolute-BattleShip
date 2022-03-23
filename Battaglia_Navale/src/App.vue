<script setup>
import { Ship, Barca } from './ship.js';
const s = new Ship("Assalto", 1900);
const b = new Barca("Portaerei", 1900);
console.log(s);
console.log(b);
</script>
<template>
  <div class="row">
    <div class="col">
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ s.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
      <h1>{{ b.name }}</h1>
    </div>
  </div>
</template>