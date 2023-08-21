<script setup lang="ts">
import { Aim } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { BoundingBox, Ellipse, Hex } from '../../../src'
import { useTilePicker } from '../../composables'

type Pair = [first: number, second: number]

type Label = keyof Hex | keyof Ellipse | keyof BoundingBox

interface PairControlProps {
  values?: Pair
  labels?: [first: Label, second: Label]
  allowDefault?: boolean
  hasPicker?: boolean
  step?: number
  labelWidth?: string
}

type PairControlEmits = {
  change: [values: Pair | undefined]
}

const props = withDefaults(defineProps<PairControlProps>(), {
  labels: () => ['q', 'r'],
  allowDefault: false,
  hasPicker: false,
  labelWidth: '24px',
})
const emit = defineEmits<PairControlEmits>()

const useDefault = ref(!props.values)
const first = computed(() => props.values?.[0] ?? 0)
const second = computed(() => props.values?.[1] ?? 0)
const isPickerActive = ref(false)

const { togglePicking } = useTilePicker()

const update = (first: number, second: number) => {
  emit('change', [first, second])
}

const toggleTilePicker = async () => {
  const tile = await togglePicking(isPickerActive)
  if (tile) {
    const [first, second] = props.labels as [keyof Hex, keyof Hex]
    update(tile[first] as number, tile[second] as number)
  }
}
</script>

<template>
  <el-switch
    v-if="allowDefault"
    v-model="useDefault"
    active-text="Use default"
    size="small"
    @change="$event ? emit('change', undefined) : update(first, second)"
    class="switch"
  />
  <div v-if="!useDefault" class="controls">
    <div class="inputs">
      <el-form-item :label="labels[0]" :label-width="labelWidth">
        <el-input-number
          :model-value="first"
          @change="update($event as number, second)"
          :step="step"
          :value-on-clear="0"
          :disabled="useDefault"
          class="input-number"
        />
      </el-form-item>
      <el-form-item :label="labels[1]" :label-width="labelWidth">
        <el-input-number
          :model-value="second"
          @change="update(first, $event as number)"
          :step="step"
          :value-on-clear="0"
          :disabled="useDefault"
          class="input-number"
        />
      </el-form-item>
    </div>
    <el-tooltip v-if="hasPicker" content="Click on a tile to select" :show-after="500">
      <el-button
        :icon="Aim"
        circle
        :type="isPickerActive ? 'primary' : undefined"
        @click="toggleTilePicker()"
        class="pick-tile"
      />
    </el-tooltip>
  </div>
</template>

<style scoped>
.switch {
  margin: 4px 0 8px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-number {
  /* 150px - 24px: default width - default label width */
  max-width: 126px;
}

.pick-tile {
  --el-button-hover-border-color: var(--vp-c-brand-light);
}
</style>
