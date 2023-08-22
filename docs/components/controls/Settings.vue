<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../../stores'

const { coordinatesType } = storeToRefs(useSettingsStore())
</script>

<template>
  <el-form-item label="Coordinates">
    <el-radio-group v-model="coordinatesType">
      <el-radio-button label="axial" />
      <el-radio-button label="offset" />
      <el-radio-button label="hide" />
    </el-radio-group>
  </el-form-item>
</template>
