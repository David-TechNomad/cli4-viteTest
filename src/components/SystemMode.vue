<template>
  <el-dropdown
    @command="handleCommand"
    :style="{ width: '210px', textAlign: 'right' }"
  >
    <el-button type="primary" plain>
      系统模式：{{ systemMode }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="AUTO">自动模式</el-dropdown-item>
        <el-dropdown-item command="MANUAL">手动模式</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SystemMode",
  setup() {
    const store = useStore();
    store.dispatch("getSystemMode");
    const systemMode = computed(() => {
      return store.getters.systemMode;
    });
    function handleCommand(command) {
      store.dispatch("setSystemMode", command);
    }
    return {
      systemMode,
      handleCommand,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>