<script setup lang="ts">
import { CoordinatesType } from '../tile-grid/TileGrid.vue'

export interface SettingsProps {
  coordinates: CoordinatesType
}

export type SettingsEmits = {
  change: [value: SettingsProps]
}

defineProps<SettingsProps>()
const emit = defineEmits<SettingsEmits>()

const update = (value: CoordinatesType) => {
  emit('change', { coordinates: value })
}
</script>

<template>
  <el-form-item label="Coordinates">
    <el-radio-group :model-value="coordinates" @change="update($event as CoordinatesType)">
      <el-radio-button label="hide" />
      <el-radio-button label="axial" />
      <el-radio-button label="offset" />
    </el-radio-group>
  </el-form-item>
</template>
