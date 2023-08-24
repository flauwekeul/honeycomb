<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHexSettingsStore } from '../../stores'
import DimensionsControl from './hex-settings-controls/DimensionsControl.vue'
import OriginControl from './hex-settings-controls/OriginControl.vue'
import ReadMore from './shared/ReadMore.vue'

const { orientation, dimensions, origin, offset } = storeToRefs(useHexSettingsStore())
</script>

<template>
  <el-form-item label="Orientation">
    <el-radio-group v-model="orientation">
      <el-radio-button label="pointy" />
      <el-radio-button label="flat" />
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Dimensions">
    <DimensionsControl v-model="dimensions" :orientation="orientation" />
  </el-form-item>
  <el-form-item label="Origin">
    <OriginControl v-model="origin" />
  </el-form-item>
  <el-form-item label="Offset">
    <el-radio-group v-model="offset">
      <el-radio-button :label="-1" />
      <el-radio-button :label="1" />
    </el-radio-group>
    <ReadMore link="/guide/custom-hexes#offset" tooltip="Read more about the hex offset" />
  </el-form-item>
</template>
