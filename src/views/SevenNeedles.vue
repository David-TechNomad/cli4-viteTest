<template>
  <div class="seven-needles">
    <el-row :gutter="0" style="padding: 20px">
      <el-col :span="12" :offset="0">
        <el-button
          type="primary"
          plain
          :disabled="isDisabled()"
          @click="onOpenTkyClick"
        >
          激活探空仪
        </el-button>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button
          type="primary"
          plain
          :disabled="isDisabled()"
          @click="onCloseTkyClick"
        >
          关闭探空仪
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="0" style="padding: 20px">
      <el-col :span="12" :offset="0">
        <el-button
          type="primary"
          plain
          :disabled="isDisabled()"
          @click="onGetTkyFreqClick"
        >
          获取探空仪频点
        </el-button>
        <span style="padding-left: 15px" v-show="sondeFreq">
          {{ sondeFreq }}MHZ
        </span>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button
          type="primary"
          plain
          :disabled="isDisabled()"
          @click="onGetTkyIdClick"
        >
          获取探空仪id
        </el-button>
        <span style="padding-left: 15px" v-show="sondeId">{{ sondeId }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="0" :style="{ padding: '20px' }">
      <el-col :span="12" :offset="0">
        <el-form
          :model="formData"
          ref="form"
          :rules="rules"
          label-width="80px"
          :inline="true"
        >
          <el-form-item prop="sondeFreq">
            <el-input
              v-model="formData.sondeFreq"
              placeholder="频点取值范围400-406"
              :disabled="isDisabled()"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              :disabled="isDisabled()"
              @click="onSondeFreqSubmit"
            >
              设置探空仪频点
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button
          type="primary"
          plain
          :disabled="isDisabled()"
          @click="onGetSondePowerClick"
        >
          获取探空仪功率
        </el-button>
        <span style="padding-left: 15px" v-show="sondePower">
          {{ sondePower }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import {
  powerOn,
  powerOff,
  getSondeFreq,
  getSondeId,
  setSondeFreq,
  getSondePower,
} from "../api/sevenNeedles";
export default {
  name: "SevenNeedles",
  setup() {
    const store = useStore();
    const state = reactive({
      sondeStatus: null,
      sondeId: "",
      sondeFreq: "",
      sondePower: "",
      formData: {
        sondeFreq: "",
      },
      rules: {
        sondeFreq: [
          {
            validator: function (rule, value, callback) {
              // if (!value) return callback(new Error("请输入探空仪频点"));
              if (value && (value < 400 || value > 406)) {
                return callback(new Error("取值范围400-406"));
              }
              callback();
            },
            trigger: ["change", "blur"],
          },
        ],
      },
    });
    function isDisabled() {
      const disableMode = ["AUTO", "SETTING", "INITIALIZING"];
      return disableMode.includes(store.state.systemMode);
    }
    function showMessage(result) {
      ElMessage({
        type:
          result === true ? "success" : result === false ? "error" : "warning",
        message:
          result === true ? "操作成功" : result === false ? "操作失败" : result,
        duration: result === true ? 2000 : 3000,
      });
    }
    function onOpenTkyClick() {
      if (isDisabled()) return;
      powerOn().then((res) => showMessage(res.powerOn));
    }
    function onCloseTkyClick() {
      if (isDisabled()) return;
      powerOff().then((res) => showMessage(res.powerOff));
    }
    function onGetTkyFreqClick() {
      if (isDisabled()) return;
      getSondeFreq().then((res) => {
        if (res.SondeFreq) {
          state.sondeFreq = res.SondeFreq;
        }
      });
    }
    function onGetTkyIdClick() {
      if (isDisabled()) return;
      getSondeId().then((res) => {
        if (res.SondeId) {
          // const id = parseInt("0x" + res.SondeId);
          // state.sondeId = id;
          state.sondeId = res.SondeId;
        }
      });
    }
    function onSondeFreqSubmit() {
      if (isDisabled()) return;
      if (!state.formData.sondeFreq) return;
      setSondeFreq(state.formData.sondeFreq).then((res) => {
        showMessage(res.setSondeFreq);
      });
    }
    function onGetSondePowerClick() {
      if (isDisabled()) return;
      getSondePower().then((res) => {
        state.sondePower = res.sondePower;
      });
    }
    return {
      ...toRefs(state),
      onOpenTkyClick,
      onCloseTkyClick,
      onGetTkyFreqClick,
      onGetTkyIdClick,
      onSondeFreqSubmit,
      onGetSondePowerClick,
      isDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.seven-needles {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>