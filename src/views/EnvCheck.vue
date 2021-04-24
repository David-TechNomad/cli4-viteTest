<template>
  <!-- 环境检测要素 -->
  <div style="margin-top: 0px">
    <div class="title">环境检测要素</div>
    <div class="border p-10" style="color: #606266">
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ toFixedFilter(gasThickness1) }} Ppm</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ toFixedFilter(gasThickness2) }} Ppm</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房总管道压力：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ toFixedFilter(pipePressure) }} kPa</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">
              <span> {{ toFixedFilter(smokeDetector1) }} Ppm </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ statusFilter(smokeDetector2) }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境设备状态：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ statusFilter(status) }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境温度：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ toFixedFilter(temperature, 2) }} ℃</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境湿度：</el-col>
            <el-col :span="12" class="p-10">
              <span>{{ toFixedFilter(humidity, 2) }} %RH</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室水浸传感器：</el-col>
            <el-col :span="12" class="p-10">
              {{ sensorFilter(waterLeakSensor) }}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气1浓度：</el-col>
            <el-col :span="12" class="p-10"
              >{{ toFixedFilter(roomGasThickness1) }} Ppm</el-col
            >
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气2浓度：</el-col>
            <el-col :span="12" class="p-10"
              >{{ toFixedFilter(roomGasThickness2) }} Ppm</el-col
            >
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路1管道压力：</el-col>
            <el-col :span="12" class="p-10"
              >{{ toFixedFilter(roomPipePressure1) }} kPa</el-col
            >
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路2管道压力：</el-col>
            <el-col :span="12" class="p-10"
              >{{ toFixedFilter(roomPipePressure2) }} kPa</el-col
            >
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">
              {{ toFixedFilter(roomSmokeDetector1) }} Ppm
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房水浸传感器：</el-col>
            <el-col :span="12" class="p-10">
              {{ sensorFilter(roomWaterLeakSensor) }}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风速：</el-col>
            <el-col :span="12" class="p-10">
              {{ toFixedFilter(domeWindSpeed) }} m/s
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风向：</el-col>
            <el-col :span="12" class="p-10"
              >{{ toFixedFilter(domeWindDirection) }} °</el-col
            >
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10"></el-col>
            <el-col :span="12" class="p-10"></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- 阈值设置 -->
  <div style="margin-top: 20px">
    <div class="title">阈值设置</div>
    <el-form
      :model="threshold"
      :rules="thresholdRules"
      label-width="240px"
      :inline="true"
      style="border: 1px solid #dcdfe6; padding: 20px"
      ref="thresholdRef"
    >
      <el-row type="flex" align="middle" justify="center">
        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="氢气浓度上限(0-9999Ppm):"
            prop="hydrogen"
          >
            <el-input v-model.number="threshold.hydrogen"></el-input>
            <el-button type="primary" @click="hydrogenFn(threshold.hydrogen)">
              保存
            </el-button>
            <el-button type="primary" @click="getHydrogenInquire">
              查询
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="管道压力上限(0-30000kPa):"
            prop="press"
          >
            <el-input v-model.number="threshold.press"></el-input>
            <el-button type="primary" @click="pressFn(threshold.press)">
              保存
            </el-button>
            <el-button type="primary" @click="getPressInquire">
              查询
            </el-button>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="烟雾报警器上限(0-5000Ppm):"
            prop="smoke"
          >
            <el-input v-model.number="threshold.smoke"></el-input>

            <el-button type="primary" @click="smokeFn(threshold.smoke)">
              保存
            </el-button>
            <el-button type="primary" @click="getSmokeInquire">
              查询
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="开启时间上限设置(0-1800S):"
            prop="openTime"
          >
            <el-input v-model.number="threshold.openTime"></el-input>
            <el-button type="primary" @click="openTimeFn(threshold.openTime)">
              保存
            </el-button>
            <el-button type="primary" @click="getOpenTimeInquire">
              查询
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="轻微氢气浓度警告阈值:"
            prop="lowHydrogen"
          >
            <el-input v-model.number="threshold.lowHydrogen"></el-input>
            <el-button
              type="primary"
              @click="lowHydrogenFn(threshold.lowHydrogen)"
            >
              保存
            </el-button>
            <el-button type="primary" :style="{ visibility: 'hidden' }">
              查询
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :offset="0">
          <el-form-item
            class="el_form_item"
            label="轻微管道压力警告阈值:"
            prop="lowPress"
          >
            <el-input v-model.number="threshold.lowPress"></el-input>
            <el-button type="primary" @click="lowPressFn(threshold.lowPress)">
              保存
            </el-button>
            <el-button type="primary" :style="{ visibility: 'hidden' }">
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item style="margin-bottom: 0">
        <el-button @click="onThresholdSubmit">提交</el-button>
      </el-form-item> -->
    </el-form>
  </div>
  <!-- 安全阀门开关 -->
  <div style="margin-top: 20px">
    <div class="title">安全阀门开关</div>
    <el-form
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          v-for="(col, index) in valve"
          :key="index"
        >
          <el-form-item
            v-for="item in col"
            :key="item.type"
            :label="item.name + ':'"
          >
            <el-button
              type="primary"
              circle
              size="small"
              @click="onSetValveState(true, item)"
              :disabled="isDisabledSetValve(item.param)"
            >
              开
            </el-button>
            <svg
              style="vertical-align: middle; margin: 0 10px"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                :fill="item.status ? 'green' : 'red'"
              ></path>
            </svg>

            <el-button
              type="primary"
              circle
              size="small"
              @click="onSetValveState(false, item)"
              :disabled="isDisabledSetValve(item.param)"
            >
              关
            </el-button>
            <!-- <el-switch
              style="margin: 0 20px"
              v-model="item.status"
              active-text="开"
              inactive-text="关"
              :disabled="warning[item.param]"
              @change="onValveChange($event, item)"
            ></el-switch> -->
            <i
              v-show="warning[item.param]"
              class="el-icon-warning"
              style="
                color: #f40;
                font-size: 24px;
                vertical-align: middle;
                margin: 0 10px;
              "
              title="异常"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 报警使能复位开关 -->
  <div style="margin-top: 20px">
    <div class="title">报警使能复位开关</div>
    <el-form
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          v-for="(col, index) in enableResetData"
          :key="index"
        >
          <el-form-item
            v-for="item in col"
            :key="item.param"
            :label="item.name + ':'"
          >
            <el-row>
              <el-col :span="12" :offset="0">
                <el-form-item :prop="item.param">
                  <el-switch
                    v-model="item.status"
                    active-text="开"
                    inactive-text="关"
                    @change="onEnableChange($event, item)"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  round
                  size="small"
                  type="primary"
                  :disabled="!item.status"
                  @click="onResetClick(item)"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { onMounted, onUnmounted, toRefs } from "vue";
import useEnvInfo from "../hooks/useEnvInfo";
import useThreshold from "../hooks/useThreshold";
import useValve from "../hooks/useValve";
import useEnableReset from "../hooks/useEnableReset";
import useEventBus from "../hooks/useEventBus";

export default {
  setup() {
    const IS_MOCK = true;
    useEventBus("EnvironmentalInfo", handleEventBusMsg, {
      IS_MOCK,
      mockDataName: "envInfo",
      times: Infinity,
    });
    function handleEventBusMsg(envInfo) {
      handleEnvInfo(envInfo);
      handleValveStatus(envInfo);
    }
    // 环境监测要素
    const {
      envState,
      statusFilter,
      sensorFilter,
      toFixedFilter,
      handleEnvInfo,
    } = useEnvInfo();
    // 阈值范围
    const {
      thresholdState,
      onThresholdSubmit,
      thresholdRef,
      smoke: smokeFn,
      press: pressFn,
      hydrogen: hydrogenFn,
      openTime: openTimeFn,
      lowHydrogen: lowHydrogenFn,
      lowPress: lowPressFn,
      getOpenTimeInquire,
      getHydrogenInquire,
      getSmokeInquire,
      getPressInquire,
    } = useThreshold();
    // 阀门开关
    const {
      valveState,
      onValveChange,
      handleValveStatus,
      onSetValveState,
      isDisabledSetValve,
    } = useValve(IS_MOCK);
    // 使能、复位开关
    const { enableResetState, onResetClick, onEnableChange } = useEnableReset();
    return {
      ...toRefs(envState),
      statusFilter,
      sensorFilter,
      toFixedFilter,
      ...toRefs(thresholdState),
      onThresholdSubmit,
      thresholdRef,
      smokeFn,
      pressFn,
      hydrogenFn,
      openTimeFn,
      lowHydrogenFn,
      lowPressFn,
      getOpenTimeInquire,
      getHydrogenInquire,
      getSmokeInquire,
      getPressInquire,
      ...toRefs(valveState),
      // onValveChange,
      onSetValveState,
      isDisabledSetValve,
      ...toRefs(enableResetState),
      onEnableChange,
      onResetClick,
    };
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
.w-60 {
  width: 60%;
}
.d-inline-block {
  display: inline-block;
}
.p-10 {
  padding: 10px;
}
.border {
  border: 1px solid #dcdfe6;
}
.border-bottom {
  border-bottom: 1px solid #dcdfe6;
}
.border-right {
  border-right: 1px solid #dcdfe6;
}
.border-left {
  border-left: 1px solid #dcdfe6;
}
.border-top {
  border-top: 1px solid #dcdfe6;
}
.el_form_item {
  white-space: nowrap;
  ::v-deep(.el-form-item__content .el-input) {
    margin-right: 10px;
    width: 100px;
  }
}
</style>