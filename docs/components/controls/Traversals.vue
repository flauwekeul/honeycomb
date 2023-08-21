<script setup lang="ts">
import { ArrowDown, ArrowUp, Delete } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'
import { useInitialHexesStore, useTraversalsStore } from '../../stores'
import { TraverserName } from '../../types'
import TraverserControl from './TraverserControl.vue'

interface TraversalsProps {
  traversalsStore: ReturnType<typeof useInitialHexesStore | typeof useTraversalsStore>
}

const TRAVERSER_NAMES: Record<TraverserName, string> = {
  lineBetween: 'Line',
  lineAsVector: 'Line',
  rectangle: 'Rectangle',
  ring: 'Ring',
  spiral: 'Spiral',
}

const props = defineProps<TraversalsProps>()

const { add, update, moveUp, moveDown, delete_ } = props.traversalsStore
const { traversers } = storeToRefs(props.traversalsStore)
const bail = computed(() => (props.traversalsStore as ReturnType<typeof useTraversalsStore>).bail)
const containerEl = ref<HTMLElement | null>(null)

watch(props.traversalsStore.traversers, async () => {
  await nextTick()
  const items = Array.from(containerEl.value?.children ?? [])
  items.at(-1)?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <div class="controls">
    <el-button type="primary" @click="add()">Add traverser</el-button>
    <el-switch
      v-if="bail != null"
      :model-value="bail"
      active-text="Bail"
      @change="traversalsStore.$patch({ bail: $event as boolean })"
    />
  </div>
  <div v-if="traversers.length" ref="containerEl">
    <el-card v-for="(config, index) of traversers" :key="index" shadow="never" class="traverser">
      <template #header>
        <div class="traverser-header">
          {{ index + 1 }}: {{ TRAVERSER_NAMES[config.name] }}
          <el-button-group size="small">
            <el-tooltip content="Move up" placement="top">
              <el-button plain :icon="ArrowUp" :disabled="index === 0" @click="moveUp(index)" />
            </el-tooltip>
            <el-tooltip content="Move down" placement="top">
              <el-button plain :icon="ArrowDown" :disabled="index === traversers.length - 1" @click="moveDown(index)" />
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <el-button plain :icon="Delete" @click="delete_(index)" />
            </el-tooltip>
          </el-button-group>
        </div>
      </template>
      <TraverserControl v-bind="config" @change="update(index, $event)" />
    </el-card>
    <el-button type="primary" @click="add()">Add traverser</el-button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.traverser {
  --el-card-padding: 1rem;

  margin-bottom: 1rem;
}

.traverser-header {
  display: flex;
  justify-content: space-between;
}
</style>
