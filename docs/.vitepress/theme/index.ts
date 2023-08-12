import { createPinia } from 'pinia'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    const pinia = createPinia()
    app.use(pinia)
  },
}
