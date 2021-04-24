<template>
  <el-row :gutter="20" v-if="false">
    <el-col :span="24" :offset="0">
      <el-button type="primary" @click="back"> 返回 </el-button>
    </el-col>
  </el-row>

  <div class="ups">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in upsInfo"
        :key="item.param"
      >
        <span class="ups-name">{{ item.name }}({{ item.param }})：</span>
        <span>{{ item.value }} {{ item.unit }}</span>
      </el-col>
    </el-row>
  </div>

  <div class="ups" v-loading="loading">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in ups"
        :key="item.param"
      >
        <span class="ups-name">{{ item.name }}：</span>
        <el-switch
          :disabled="disabled && item.param !== 'MAIN'"
          v-model="item.status"
          active-text="开"
          inactive-text="关"
          @change="onUpsChange($event, item)"
        >
        </el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";

import { useRouter } from "vue-router";
import useUps from "../hooks/useUps";
import useEventBus from "../hooks/useEventBus";
import { getUpsInfoMap } from "../data-map/ups";
import { toFixedFilter } from "../utils/utils";
export default {
  name: "Ups",
  setup() {
    const IS_MOCK = true;
    useEventBus("PowerInfo", handleUpsInfo, {
      IS_MOCK,
      mockDataName: "upsInfo",
    });
    const { upsState, onUpsChange } = useUps();
    const router = useRouter();
    function back() {
      router.go(-1);
    }
    const upsInfoState = reactive({
      upsInfo: upsInfoInit(),
    });
    function upsInfoInit() {
      return Object.values(getUpsInfoMap());
    }
    function handleUpsInfo(upsInfo) {
      console.log(upsInfo);
      for (const key in upsInfo) {
        const cur = upsInfoState.upsInfo.find((value) => value.param === key);
        // cur && (cur.value = upsInfo[key]);
        cur && (cur.value = toFixedFilter(upsInfo[key]));
      }
    }

    return { ...toRefs(upsState), onUpsChange, back, ...toRefs(upsInfoState) };
  },
};
</script>

<style lang="scss" scoped>
.ups {
  color: #333;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  .col {
    height: 40px;
    display: flex;
    align-items: center;

    .ups-name {
      display: inline-block;
      width: 60%;
    }
  }
}
</style>