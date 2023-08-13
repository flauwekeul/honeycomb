<script setup lang="ts">
import { ArrowDown, ArrowUp, Delete } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useTraversalsStore } from '../../stores'
import TraverserControl from './TraverserControl.vue'

const traversalsStore = useTraversalsStore()
const { add, update, moveUp, moveDown, delete_ } = traversalsStore
const { traversers } = storeToRefs(traversalsStore)
</script>

<template>
  <template v-if="traversers.length">
    <el-card v-for="(config, index) of traversers" :key="index" shadow="never" class="traverser">
      <template #header>
        <div class="traverser-header">
          {{ index + 1 }}: {{ config.name }}
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
  </template>
  <el-button type="primary" @click="add()">Add traverser</el-button>
</template>

<style scoped>
.traverser {
  --el-card-padding: 1rem;

  margin-bottom: 1rem;
}

.traverser-header {
  display: flex;
  justify-content: space-between;
}
</style>
