<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInitialHexesStore } from '../../stores'
import { TRAVERSER_NAMES } from '../../types'
import LineControl from './traverser-controls/LineControl.vue'
import RectangleControl from './traverser-controls/RectangleControl.vue'
import RingControl from './traverser-controls/RingControl.vue'
import SpiralControl from './traverser-controls/SpiralControl.vue'

const { name, line, rectangle, ring, spiral } = storeToRefs(useInitialHexesStore())
</script>

<template>
  <el-form-item label="Shape">
    <el-select v-model="name">
      <el-option
        v-for="type in TRAVERSER_NAMES"
        :key="type"
        :label="type"
        :value="type"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
  <el-divider />
  <LineControl v-if="name === 'line'" v-bind="line" @change="line = $event" />
  <RectangleControl v-if="name === 'rectangle'" v-bind="rectangle" @change="rectangle = $event" />
  <RingControl v-if="name === 'ring'" v-bind="ring" @change="ring = $event" />
  <SpiralControl v-if="name === 'spiral'" v-bind="spiral" @change="spiral = $event" />
</template>
