import { createApp } from 'vue'
import Game from '../Game.vue'
document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(Game)
  app.mount('#app')
})
