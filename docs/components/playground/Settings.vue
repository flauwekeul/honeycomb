<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores'

const { coordinates } = storeToRefs(useSettingsStore())
</script>

<template>
  <el-form-item label="Coordinates">
    <el-radio-group v-model="coordinates">
      <el-radio-button label="hide" />
      <el-radio-button label="axial" />
      <el-radio-button label="offset" />
    </el-radio-group>
  </el-form-item>
</template>
