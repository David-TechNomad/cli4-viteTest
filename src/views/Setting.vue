<template>
  <teleport to="#setting">
    <el-button
      circle
      type="primary"
      icon="el-icon-setting"
      title="报警静音设置"
      @click="openSetting"
    >
    </el-button>
  </teleport>

  <el-dialog title="报警静音设置" v-model="drawer" width="30%">
    <!-- <el-switch
      v-model="isMuted"
      :active-value="true"
      active-text="是"
      :inactive-value="false"
      inactive-text="否"
      @change="handleMuteChange"
    >
    </el-switch> -->
    <el-checkbox v-model="isMuted" @change="handleMuteChange">
      关闭报警声音
    </el-checkbox>
  </el-dialog>

  <!-- <el-drawer
    v-model="drawer"
    direction="btt"
    :with-header="false"
    :append-to-body="true"
  >
    <div :style="{ padding: '20px' }">
      <div>报警静音：</div>
      <el-switch
        v-model="isMuted"
        :active-value="true"
        active-text="是"
        :inactive-value="false"
        inactive-text="否"
        @change="handleMuteChange"
      >
      </el-switch>
    </div>
  </el-drawer> -->
</template>

<script>
import { computed, ref } from "vue";
import { getMuted } from "@/utils/utils.js";

export default {
  setup() {
    const SettingDOM = document.createElement("div");
    SettingDOM.id = "setting";
    // SettingDOM.title = "报警静音设置";
    SettingDOM.style.position = "fixed";
    SettingDOM.style.top = "50%";
    SettingDOM.style.right = "16px";
    SettingDOM.style.transform = "translateY(-50%)";
    SettingDOM.style.zIndex = "10";

    document.body.appendChild(SettingDOM);

    function openSetting() {
      drawer.value = true;
    }

    const drawer = ref(false);

    const isMuted = ref(getMuted() || false);
    function handleMuteChange(value) {
      localStorage.setItem("audio-config", JSON.stringify({ muted: value }));
    }

    return { openSetting, drawer, isMuted, handleMuteChange };
  },
};
</script>

<style lang="scss" scoped>
</style>