<script setup lang="ts">
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view'
import ts from 'typescript'
import { onMounted, ref } from 'vue'
import { Grid, Hex, defaultHexSettings, defineHex, rectangle } from '../../src'
import TileGrid from '../components/TileGrid.vue'

const { ScriptTarget, transpile } = ts

// const hexSettings = { ...defaultHexSettings, dimensions: 30 }
// const Hex = defineHex(hexSettings)
// const initialHexes = rectangle({ width: 10, height: 10 })
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
// let grid = new Grid(Hex, initialHexes)
let grid = new Grid(Hex)
const gridKey = ref(Math.random())

const editorEl = ref<HTMLDivElement | null>(null)
let editorView: EditorView | undefined
let editorState: EditorState | undefined

const initialCode = `
const Hex = defineHex({
  ...defaultHexSettings,
  dimensions: 30
})
const initialHexes = rectangle({ width: 10, height: 10 })

const grid = new Grid(Hex, initialHexes)
`.trim()

const run = () => {
  const input = editorView?.state.doc.toString() || ''
  const js = transpile(input, { target: ScriptTarget.ES2022 })
  console.log(js)
  const evaluate = new Function('defaultHexSettings', 'defineHex', 'rectangle', 'Grid', `${js}; return grid`)

  try {
    grid = evaluate(defaultHexSettings, defineHex, rectangle, Grid)
    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  editorState = EditorState.create({
    doc: initialCode,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab,
      ]),
      javascript({ typescript: true }),
    ],
  })
  editorView = new EditorView({
    parent: editorEl.value as HTMLDivElement,
    state: editorState,
  })

  run()
})
</script>

<template>
  <div class="playground">
    <div ref="editorEl"></div>
    <button type="button" @click="run">Run</button>
    <TileGrid :grid="grid" :key="gridKey" />
    <!-- <TileControls :hex-settings="hexSettings" @update="update" class="controls" /> -->
  </div>
</template>

<style scoped>
.playground {
  /* position: relative; */
  /* margin: 32px; */
}

/* .controls {
  position: absolute;
  top: 0;
  left: 0;
} */
</style>
