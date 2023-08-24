<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useInitialHexesStore, useTraversalsStore } from '../../stores'
import HexSettings from './HexSettings.vue'
import Settings from './Settings.vue'
import Traversals from './Traversals.vue'
import ReadMore from './shared/ReadMore.vue'

const traversalsStore = useTraversalsStore()
const initialHexesStore = useInitialHexesStore()
</script>

<template>
  <el-card class="controls">
    <el-form label-width="auto" class="form">
      <el-tabs>
        <el-tab-pane label="Hex">
          <HexSettings />
        </el-tab-pane>
        <el-tab-pane label="Grid">
          <Traversals :traversals-store="initialHexesStore">
            <template #controls>
              <ReadMore
                link="/guide/creating-grids#new-grid-hex-traverser"
                tooltip="Read more about creating a grid by passing traversers"
              />
            </template>
          </Traversals>
        </el-tab-pane>
        <el-tab-pane label="Traversals">
          <Traversals :traversals-store="traversalsStore">
            <template #controls>
              <div>
                <el-switch
                  :model-value="traversalsStore.bail"
                  active-text="Bail"
                  @change="traversalsStore.$patch({ bail: $event as boolean })"
                />
                <ReadMore
                  link="/guide/traversing-grids#bail-a-traversal"
                  tooltip="Read more about bailing a traverser"
                  margin="0 0 0 4px"
                />
              </div>
              <ReadMore link="/guide/traversing-grids" tooltip="Read more about traversers" />
            </template>
          </Traversals>
        </el-tab-pane>
        <el-tab-pane label="Settings">
          <Settings />
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<style>
.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--vp-c-black);
}

.dark .el-button.el-button--primary {
  --el-button-text-color: var(--vp-c-black);
  --el-button-hover-text-color: var(--vp-c-text-light-1);
}

.controls {
  --el-color-primary: var(--vp-c-brand);
  --el-color-primary-light-3: var(--vp-c-brand-dark);
  --el-color-primary-light-5: var(--vp-c-brand-darker);
  --el-color-primary-dark-2: var(--vp-c-brand-light);
  --el-text-color-regular: var(--vp-c-text-1);
}
</style>
