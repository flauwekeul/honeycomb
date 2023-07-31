<script setup lang="ts">
export interface XYControlProps {
  x: number
  y: number
}

export type XYControlEmits = {
  update: [value: XYControlProps]
}

defineProps<XYControlProps>()
const emit = defineEmits<XYControlEmits>()

const update = (value: XYControlProps) => {
  emit('update', value)
}
</script>

<template>
  <el-space direction="vertical">
    <el-form-item label="x" label-width="32px">
      <el-input-number
        :model-value="x"
        @change="update({ x: $event as number, y: y })"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
    <el-form-item label="y" label-width="32px">
      <el-input-number
        :model-value="y"
        @change="update({ x: x, y: $event as number })"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
  </el-space>
</template>

<style scoped>
.input-number {
  /* 150px - 32px: default width - label width */
  max-width: 118px;
}
</style>
