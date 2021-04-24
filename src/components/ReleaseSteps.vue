<template>
  <div class="release_steps">
    <el-steps :style="{ flex: 1 }" align-center>
      <el-step
        :title="item.title"
        icon="el-icon-sunny"
        :status="item.status ? 'finish' : 'wait'"
        v-for="item in steps"
        :key="item.id"
      ></el-step>
    </el-steps>
    <!-- <el-button type="primary" size="mini" @click="reset"> 重置步序 </el-button> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { resetReleaseStep } from "@/api/releaseStep.js";
import { ElMessage } from "element-plus";
export default {
  name: "ReleaseSteps",
  setup() {
    const store = useStore();
    store.dispatch("getReleaseStep");
    const steps = computed(() => {
      return store.state.steps;
    });

    function reset() {
      resetReleaseStep().then((res) => {
        console.info(res);
        if (res.resetReleaseStep) {
          ElMessage({
            type: "success",
            message: "重置成功",
            duration: 2000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "重置失败",
            duration: 3000,
          });
        }
      });
    }
    return { steps, reset };
  },
};
</script>

<style lang="scss" scoped>
.release_steps {
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
}
</style>