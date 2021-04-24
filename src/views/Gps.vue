<template>
  <el-row :gutter="20" v-if="false">
    <el-col :span="24" :offset="0">
      <el-button type="primary" @click="back"> 返回 </el-button>
    </el-col>
  </el-row>

  <div class="gps">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in gpsInfo"
        :key="item.key"
      >
        <span class="name">{{ item.name }}:</span>
        <span>{{ item.value }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getGpsInfoMap } from "../data-map/gps";
import useEnableReset from "../hooks/useEnableReset";
import useEventBus from "../hooks/useEventBus";

export default {
  name: "Gps",
  setup() {
    const IS_MOCK = true;
    useEventBus("GPS", handleGpsInfo, {
      IS_MOCK,
      mockDataName: "gpsInfo",
    });

    function handleGpsInfo(gpsInfo) {
      for (const key in gpsInfo) {
        const cur = gpsInfoState.gpsInfo.find((value) => value.key === key);
        cur && (cur.value = gpsInfo[key]);
      }
    }
    const gpsInfoState = reactive({
      gpsInfo: gpsInfoInit(),
    });
    const router = useRouter();
    function back() {
      router.go(-1);
    }
    function gpsInfoInit() {
      return Object.values(getGpsInfoMap());
    }
    return { ...toRefs(gpsInfoState), back };
  },
};
</script>

<style lang="scss" scoped>
.gps {
  color: #333;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  .col {
    height: 40px;
    display: flex;
    align-items: center;

    .name {
      display: inline-block;
      width: 60%;
    }
  }
}
</style>