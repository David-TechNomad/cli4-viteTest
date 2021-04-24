<template>
  <!-- 报警使能复位开关 -->
  <div>
    <div class="title">设备使能开关</div>
    <el-form
      label-width="300px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          v-for="(item, index) in deviceEnable"
          :key="index"
        >
          <el-form-item :label="item.label + '(' + item.name + ')'">
            <el-switch
              v-model="item.status"
              active-text="停用"
              inactive-text="启用"
              :active-value="false"
              :inactive-value="true"
              inactive-color="#409EFF"
              active-color="#DCDFE6"
              @change="onEnableChange($event, item)"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getDeviceEnable,
  openDeviceEnable,
  closeDeviceEnable,
  deviceEnableDict,
} from "../api/deviceEnable";
import { onMounted, reactive, toRefs } from "vue";

import { showMessage } from "../utils/utils";
export default {
  setup() {
    onMounted(() => deviceEnable());
    const deviceEnableState = reactive({
      deviceEnable: [],
    });
    // 获取全部设备使能
    function deviceEnable() {
      getDeviceEnable().then((data) => {
        deviceEnableState.deviceEnable = formatDeviceEnable(data);
      });
    }
    function formatDeviceEnable(data) {
      return data.map((item) => {
        return formatDataItem(item);
      });
    }
    function formatDataItem(item) {
      return Object.keys(item).reduce((prev, current) => {
        prev.label = deviceEnableDict[current];
        prev.name = current;
        prev.status = item[current];
        return prev;
      }, {});
    }
    // 开启
    function openEnable(param) {
      openDeviceEnable(param).then((res) => {
        showMessage(res.openDeviceEnable);
      });
    }

    // 关闭
    function closeEnable(param) {
      closeDeviceEnable(param).then((res) => {
        showMessage(res.closeDeviceEnable);
      });
    }

    // 使能变化
    function onEnableChange(e, item) {
      console.log("onEnableChange -- ", e, item);
      e ? openEnable({ Dtype: item.name }) : closeEnable({ Dtype: item.name });
    }

    return { ...toRefs(deviceEnableState), onEnableChange };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  color: #606266;
  padding: 20px;
}
</style>