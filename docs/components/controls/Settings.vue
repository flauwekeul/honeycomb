<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaygroundStore, useSettingsStore } from '../../stores'
import ReadMore from './shared/ReadMore.vue'

const { coordinatesType } = storeToRefs(useSettingsStore())
const { resetAll, resetGridPosition } = usePlaygroundStore()
</script>

<template>
  <el-form-item label="Coordinates">
    <el-radio-group v-model="coordinatesType">
      <el-radio-button label="axial" />
      <el-radio-button label="offset" />
      <el-radio-button label="hide" />
    </el-radio-group>
    <ReadMore link="/guide/coordinate-system" tooltip="Read more about the coordinate system" />
  </el-form-item>
  <el-form-item>
    <el-button plain @click="resetGridPosition">Reset grid position</el-button>
  </el-form-item>
  <el-form-item>
    <el-button plain type="danger" @click="resetAll">Reset everything</el-button>
  </el-form-item>
</template>
