import { createApp } from "vue";
import App from "./App.vue";

//creazione App
const app = createApp(App);
app.mount("#app");
app.config.errorHandler = (err) => {
  /* handle error */
};
