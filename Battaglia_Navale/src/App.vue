<script setup>
import { Ship, Barca } from './ship.js';
const s = new Ship("Assalto", 1900);
const b = new Barca("Portaerei", 1900);
console.log(s);
console.log(b);
</script>
<template>
  <div class="container-fluid">
    <!-- SIDEBAR -->
    <div class="sidebar position-fixed">
      <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px; color: white">
        <div class="row">
          <div class="col-9">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
              <span class="fs-4">
                <font style="vertical-align: inherit">
                  <font style="vertical-align: inherit">Battaglia Navale</font>
                </font>
              </span>
            </a>
          </div>
          <div class="col-3">
            <button class="btn shadow-none theme-btn" type="button"></button>
          </div>
        </div>
        <hr />
        <ul class="nav nav-pills flex-column">
          <li>
            <a href="#" class="nav-link link-light">
              <font style="vertical-align: inherit">
                <font style="vertical-align: inherit"> Casa </font>
              </font>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-light">
              <font style="vertical-align: inherit">
                <font style="vertical-align: inherit"> Pannello </font>
              </font>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- APP -->
    <div class="row">
    <div class="col-12">
    </div>
  </div>
  </div>
</template>