import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseButton from '@/components/ui/BaseButton';
import BaseCard from '@/components/ui/BaseCard';
import BaseInput from '@/components/ui/BaseInput';

const app = createApp(App);


app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-input', BaseInput);

app.use(store).use(router).mount("#app");

