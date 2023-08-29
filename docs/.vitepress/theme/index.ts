import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    const pinia = createPinia()
    pinia.use(createPersistedState({ auto: true }))
    app.use(pinia)
  },
}
