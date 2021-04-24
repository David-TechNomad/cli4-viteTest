<template>
  <div class="home" v-loading="isLoading">
    时间
    <!-- <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker> -->
    <el-date-picker
      v-model="startDate"
      type="date"
      placeholder="开始日期"
      :disabled-date="disabledStartDate"
    >
    </el-date-picker>
    至
    <el-date-picker
      v-model="endDate"
      type="date"
      placeholder="结束日期"
      :disabled-date="disabledEndDate"
    >
    </el-date-picker>
    时间类型
    <el-select
      v-model="timeType"
      placeholder="请选择时间类型"
      clearable
      filterable
    >
      <el-option label="放球时间" value="放球时间"> </el-option>
      <el-option label="基测时间" value="基测时间"> </el-option>
      <el-option label="检测时间" value="检测时间"> </el-option>
    </el-select>
    <el-button type="primary" @click="onClickSearch"> 搜索 </el-button>

    <div v-if="isShowSelectTkyid">
      <div style="padding: 20px 0">探空仪编号</div>
      <el-select
        v-model="tkyid"
        filterable
        :remote="false"
        placeholder="请选择探空仪编号"
        @change="handleTkyidChange"
      >
        <el-option
          v-for="item in tkyids"
          :key="item.tkyid"
          :label="item.tkyid"
          :value="item.tkyid"
        ></el-option>
      </el-select>
    </div>
    <div v-if="!isRadioDisabled">
      <div style="padding: 20px 0">选择查询数据类型</div>
      <el-radio-group
        v-model="dataType"
        :disabled="isRadioDisabled"
        @change="handleDataTypeChange"
      >
        <el-radio-button label="探测数据"></el-radio-button>
        <el-radio-button label="瞬时值"></el-radio-button>
        <el-radio-button label="基测报告"></el-radio-button>
        <el-radio-button label="检测报告"></el-radio-button>
      </el-radio-group>
    </div>

    <div v-show="isTCSJ" style="margin-top: 20px">
      <el-table :data="tableData" border stripe :max-height="maxHeight">
        <el-table-column type="index" label="#" width="60" align="center" fixed>
        </el-table-column>
        <el-table-column
          prop="tkyid"
          label="探空仪编号"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="stationNumber"
          label="台站号"
          width="100"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="freqz"
          label="频率值"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="dataTime"
          label="数据时间"
          width="180"
          sortable
          show-overflow-tooltip
          :formatter="dataTimeFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="lng"
          label="经度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="lat"
          label="纬度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="altitude"
          label="海拔高度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="nspeed"
          label="北向速度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="espeed"
          label="东向速度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="vspeed"
          label="垂直速度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="satellitesNum"
          label="卫星数"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="气温"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="humidity"
          label="湿度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="pressure"
          label="气压"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="batteryVol"
          label="电池电压"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="boxTemperature"
          label="盒内温度"
          width="100"
          sortable
          show-overflow-tooltip
          :formatter="toFixedFormatter"
        >
        </el-table-column>
      </el-table>

      <!-- <el-date-picker
        v-if="0"
        v-model="dateForTCSJ"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        :disabled-date="disabledDate"
        @change="handleDateForTCSJChange"
      ></el-date-picker> -->
      <!-- <el-table :data="tableData" border stripe style="margin-top: 20px">
        <el-table-column
          type="index"
          width="60"
          align="center"
          label="#"
          fixed
        ></el-table-column>
        <el-table-column
          v-for="col in tkyDataColumns"
          :key="col.prop"
          :label="col.label"
          :width="
            col.prop === 'dataTime' ? 180 : col.prop === 'tkyid' ? 120 : ''
          "
        >
          <template #default="scope">
            <span v-if="col.prop === 'dataTime'">{{
              scope.row.dataTime &&
              formatDate(new Date(scope.row.dataTime), "yyyy-MM-dd HH:mm:ss")
            }}</span>
            <span v-else>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table> -->
      <div
        :style="{ marginTop: '20px', display: 'flex', alignItems: 'center' }"
      >
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handlePageNumberChange"
          :page-sizes="[20, 40, 80, 100]"
          :page-size="pageSize"
          :current-page="pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          background
        ></el-pagination>
        <el-button
          :style="{ marginLeft: '10px' }"
          type="primary"
          size="mini"
          @click="goFirst"
          :disabled="disabledGoFirst"
        >
          首页
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="goLast"
          :disabled="disabledGoLast"
        >
          末页
        </el-button>
      </div>
    </div>

    <div v-show="isSSZ" style="margin-top: 20px">
      <el-table :data="instantInfo" :show-header="false" border stripe>
        <el-table-column prop="label"></el-table-column>
        <el-table-column prop="value"></el-table-column>
      </el-table>
    </div>

    <div v-show="isJCBG" style="margin-top: 20px">
      <el-table :data="baseTestReport" :show-header="false" border stripe>
        <el-table-column prop="label"></el-table-column>
        <el-table-column prop="value"></el-table-column>
      </el-table>
    </div>

    <div v-show="isCheckReport" :style="{ marginTop: '20px' }">
      <el-table :data="checkReportData" :show-header="false" border stripe>
        <el-table-column prop="label"></el-table-column>
        <el-table-column
          prop="value"
          :formatter="toFixedFormatter"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from "vue";
import { debounce, formatDate, toFixedFilter } from "../utils/utils.js";
import {
  getBaseTestReport,
  getInstantInfo,
  getTkyData,
  getTkyInfoByFQTime,
  getTkyInfoByJCTime,
  getTkyInfoByCheckTime,
  getCheckReport,
  toFixedPropertyDict,
} from "../api/index.js";
import useDatepicker from "../hooks/useDatepicker.js";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  setup() {
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", getMaxHeight);
      console.log("onUnmounted...");
    });

    const getMaxHeight = debounce(function () {
      const viewHeight = window.document.body.offsetHeight;
      maxHeight.value = viewHeight * 0.7;
    });
    /** 时间选择框 */
    const oldDate = { st: "", et: "" };
    const { date, disabledStartDate, disabledEndDate } = useDatepicker();
    // const date = ref("");
    const timeType = ref("");

    /**
     * 根据不同时间类型获取探空仪id列表的函数Map
     */
    const getTkyInfoFnMap = new Map([
      ["放球时间", getTkyInfoByFQTime],
      ["基测时间", getTkyInfoByJCTime],
      ["检测时间", getTkyInfoByCheckTime],
    ]);
    function onClickSearch() {
      if (!date.startDate || !date.endDate || !timeType.value) {
        ElMessage({
          type: "warning",
          message: !date.startDate
            ? "请选择开始日期"
            : !date.endDate
            ? "请选择结束日期"
            : !timeType.value
            ? "请选择时间类型"
            : "",
        });
        return;
      }
      tkyid.value = "";
      const st = formatDate(date.startDate, "yyyy-MM-dd HH:mm:ss");
      const et = formatDate(date.endDate, "yyyy-MM-dd HH:mm:ss");
      oldDate.st = st;
      oldDate.et = et;
      if (state.isLoading) return;
      state.isLoading = true;
      getTkyInfoFnMap
        .get(timeType.value)(st, et)
        .then((result) => {
          console.log(`根据${timeType.value}获取探空仪id列表`, result);
          tkyids.value = result;
        })
        .finally(() => {
          state.isLoading = false;
        });
      // if (timeType.value === "放球时间") {
      //   getTkyInfoByFQTime(st, et)
      //     .then((result) => {
      //       console.log("根据放球时间获取探空仪id -- ", result);
      //       tkyids.value = result;
      //     })
      //     .finally(() => {
      //       state.isLoading = false;
      //     });
      // } else if (timeType.value === "基测时间") {
      //   getTkyInfoByJCTime(st, et)
      //     .then((result) => {
      //       console.log("根据基测时间获取探空仪id", result);
      //       tkyids.value = result;
      //     })
      //     .finally(() => {
      //       state.isLoading = false;
      //     });
      // } else if (timeType.value === "检测时间") {
      //   getTkyInfoByCheckTime(st, et)
      //     .then((result) => {
      //       console.log("根据检测时间获取探空仪id列表", result);
      //       tkyids.value = result;
      //     })
      //     .finally(() => {
      //       state.isLoading = false;
      //     });
      // }
    }
    /** 探空仪编号 */
    const tkyids = ref([]);
    const isShowSelectTkyid = computed(() => tkyids.value.length);
    const tkyid = ref("");
    function handleTkyidChange(curTkyid) {
      // tkyid.value = curTkyid;
      dataType.value = "";
      // state.dateForTCSJ = "";
      state.pageSize = 20;
      state.pageNumber = 1;
    }
    /** 选择查询数据类型 */
    const isRadioDisabled = computed(() => !tkyid.value);
    const dataType = ref("");
    const isTCSJ = computed(
      () => !isRadioDisabled.value && dataType.value === "探测数据"
    );
    const isSSZ = computed(
      () => !isRadioDisabled.value && dataType.value === "瞬时值"
    );
    const isJCBG = computed(
      () => !isRadioDisabled.value && dataType.value === "基测报告"
    );
    const isCheckReport = computed(
      () => !isRadioDisabled.value && dataType.value === "检测报告"
    );

    const tabMap = new Map([
      ["探测数据", showTkyData],
      ["瞬时值", showInstantInfo],
      ["基测报告", showBaseTestReport],
      ["检测报告", showCheckReport],
    ]);
    function handleDataTypeChange(value) {
      tabMap.get(value)();
      // switch (value) {
      //   case "基测报告":
      //     showBaseTestReport();
      //     break;
      //   case "瞬时值":
      //     showInstantInfo();
      //     break;
      //   case "探测数据":
      //     showTkyData();
      //     break;
      //   case "检测报告":
      //     showCheckReport();
      //     break;
      // }
    }
    /** 基测报告 start */
    const jcResultRecordColumns = {
      tkyid: "探空仪id",
      jcResultStatus: "基测结果状态",
      jcxPressure: "基测箱压力",
      jcxTemperature: "基测箱温度",
      jcxHumidity: "基测箱湿度",
      tkyPressure: "探空仪压力",
      tkyTemperature: "探空仪温度",
      tkyHumidity: "探空仪湿度",
      diffPressure: "压力差值",
      diffTemperature: "温度差值",
      diffHumidity: "湿度差值",
      passedPressure: "压力是否通过",
      passedTemperature: "温度是否通过",
      passedHumidity: "湿度是否通过",
      passed: "是否通过",
      // cTime: "创建时间",
    };
    const baseTestReport = ref(null);
    function showBaseTestReport() {
      if (state.isLoading) return;
      state.isLoading = true;
      getBaseTestReport(tkyid.value)
        .then((result) => {
          const jcResultRecord = result?.jcResultRecord;
          if (!jcResultRecord.ctime) {
            jcResultRecord.ctime = result?.ctime;
          }
          if (!jcResultRecord.jcResultStatus) {
            jcResultRecord.jcResultStatus = result?.jcResultStatus;
          }
          jcResultRecord.cTime = formatDate(
            new Date(jcResultRecord.ctime),
            "yyyy-MM-dd HH:mm:ss"
          );
          const baseTestReportFormatted = [];
          for (const key in jcResultRecord) {
            if (Object.hasOwnProperty.call(jcResultRecordColumns, key)) {
              if (Object.hasOwnProperty.call(toFixedPropertyDict, key)) {
                const n = toFixedPropertyDict[key];
                const v = jcResultRecord[key];
                jcResultRecord[key] = toFixedFilter(v, n);
              }
              baseTestReportFormatted.push({
                label: jcResultRecordColumns[key],
                value: passedfilter(key, jcResultRecord[key]),
              });
            }
          }
          baseTestReport.value = baseTestReportFormatted;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
    function passedfilter(key, value) {
      if (key.startsWith("passed")) {
        return value === true ? "是" : "否";
      }
      return value;
    }
    /** 瞬时值 start */
    const instantInfoColumns = {
      tkyid: "探空仪Id",
      pressure: "压强",
      temperature: "温度",
      humidity: "湿度",
      windSpeed: "风速",
      windDirection: "风向",
      cloudiness: "云量",
      cloudHeight: "云高",
      cloudform: "云状",
      weatherPhenomenon: "天气现象",
      visibility: "能见度",
      memo: "瞬时信息备忘录",
      ctime: "创建时间",
    };
    const instantInfo = ref(null);
    function showInstantInfo() {
      if (state.isLoading) return;
      state.isLoading = true;
      getInstantInfo(tkyid.value)
        .then((result) => {
          const data = result;
          data.ctime = formatDate(new Date(data.ctime), "yyyy-MM-dd HH:mm:ss");
          const instantInfoFormatted = [];
          for (const key in data) {
            if (Object.hasOwnProperty.call(instantInfoColumns, key)) {
              if (Object.hasOwnProperty.call(toFixedPropertyDict, key)) {
                const n = toFixedPropertyDict[key];
                const v = data[key];
                data[key] = toFixedFilter(v, n);
              }
              instantInfoFormatted.push({
                label: instantInfoColumns[key],
                value: data[key],
              });
            }
          }
          instantInfo.value = instantInfoFormatted;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
    /** 探测数据 start */
    const tkyData = ref({
      dataArray: [],
      totalCount: 0,
    });
    const state = reactive({
      // dateForTCSJ: "",
      // startTime: "",
      // endTime: "",
      pageSize: 20,
      pageNumber: 1,
      isShowTable: false,
      isLoading: false,
      disabledGoFirst: computed(
        () => totalCount.value === 0 || state.pageNumber === 1
      ),
      disabledGoLast: computed(() =>
        [0, 1, state.pageNumber].includes(lastPage.value)
      ),
    });
    const tableData = computed(
      () => tkyData.value?.dataArray?.slice(0, state.pageSize) || []
    );
    const totalCount = computed(() => tkyData.value?.totalCount - 0 || 0);
    const maxHeight = ref(null);
    /** 探测数据 - 时间选择框 */
    // function handleDateForTCSJChange(dates) {
    //   if (!dates) {
    //     return;
    //   }
    //   // const [st, et] = dates;
    //   // state.startTime = formatDate(st, "yyyy-MM-dd HH:mm:ss");
    //   // state.endTime = formatDate(et, "yyyy-MM-dd HH:mm:ss");
    //   state.pageNumber = 1;
    //   showTkyData();
    // }
    // function disabledDate(time) {
    //   if (!date.value) {
    //     return false;
    //   }
    //   let st = date.value[0]?.getTime();
    //   let et = date.value[1]?.getTime();
    //   return time.getTime() > et || time.getTime() < st;
    // }
    /** 探测数据 - 分页器 */
    function handlePageSizeChange(value) {
      state.pageSize = value;
      state.pageNumber = 1;
      showTkyData();
    }
    const handlePageNumberChange = debounce(function (value) {
      state.pageNumber = value;
      showTkyData();
    });
    function goFirst() {
      if (totalCount.value === 0 || state.pageNumber === 1) return;
      state.pageNumber = 1;
      showTkyData();
    }
    const lastPage = computed(() =>
      Math.ceil(totalCount.value / state.pageSize)
    );
    function goLast() {
      if ([0, 1, state.pageNumber].includes(lastPage.value)) return;
      state.pageNumber = lastPage.value;
      showTkyData();
    }
    /**
    const tkyDataColumns = [
      {
        prop: "tkyid",
        label: "探空仪编号",
      },
      {
        prop: "stationNumber",
        label: "台站号",
      },
      {
        prop: "freqz",
        label: "频率值",
      },
      {
        prop: "dataTime",
        label: "探空仪数据时间",
      },
      {
        prop: "lng",
        label: "经度",
      },
      {
        prop: "lat",
        label: "纬度",
      },
      {
        prop: "altitude",
        label: "海拔高度",
      },
      {
        prop: "nspeed",
        label: "北向速度",
      },
      {
        prop: "espeed",
        label: "东向速度",
      },
      {
        prop: "vspeed",
        label: "垂直速度",
      },
      {
        prop: "satellitesNum",
        label: "卫星数",
      },
      {
        prop: "temperature",
        label: "气温",
      },
      {
        prop: "humidity",
        label: "湿度",
      },
      {
        prop: "pressure",
        label: "气压",
      },
      {
        prop: "batteryVol",
        label: "电池电压",
      },
      {
        prop: "boxTemperature",
        label: "盒内温度",
      },
    ];
    /**/
    function showTkyData() {
      if (state.isLoading) return;
      state.isLoading = true;
      // state.dateForTCSJ = state.dateForTCSJ || date.value;
      // state.startTime = formatDate(state.dateForTCSJ[0], "yyyy-MM-dd HH:mm:ss");
      // state.endTime = formatDate(state.dateForTCSJ[1], "yyyy-MM-dd HH:mm:ss");
      const option = {
        tkyid: tkyid.value,
        startTime: oldDate.st,
        endTime: oldDate.et,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
      };
      getTkyData(option)
        .then((result) => {
          tkyData.value = result;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
    // 检测报告
    const checkResultRecordColumns = {
      tkyid: "探空仪编号",
      envPressure: "环境气压",
      envTemperature: "环境温度",
      envHumidity: "环境湿度",
      envLng: "环境经度",
      envLat: "环境纬度",
      envAlt: "环境海拔",
      tkyPressure: "探空仪气压",
      tkyTemperature: "探空仪温度",
      tkyHumidity: "探空仪湿度",
      tkyLng: "探空仪经度",
      tkyLat: "探空仪纬度",
      tkyAlt: "探空仪海拔",
      tkyBatteryVol: "电池电压",
      diffPressure: "气压差值",
      diffTemperature: "温度差值",
      diffHumidity: "湿度差值",
      diffLng: "经度差值",
      diffLat: "纬度差值",
      diffAlt: "海拔差值",
      diffBatteryVol: "电压差值",
      passedPressure: "气压是否通过",
      passedTemperature: "温度是否通过",
      passedHumidity: "湿度是否通过",
      passedLng: "经度是否通过",
      passedLat: "纬度是否通过",
      passedAlt: "海拔是否通过",
      passed: "是否通过",
      // ctime: "创建时间",
    };
    const checkReportData = ref(null);
    function showCheckReport() {
      if (state.isLoading) return;
      state.isLoading = true;
      getCheckReport(tkyid.value)
        .then((result) => {
          console.log(result, "show check report");
          const checkResultRecord = result;
          if (result.ctime) {
            checkResultRecord.ctime = formatDate(
              new Date(result?.ctime),
              "yyyy-MM-dd HH:mm:ss"
            );
          }

          const checkReportFormatted = [];
          for (const key in checkResultRecord) {
            if (
              Object.hasOwnProperty.call(checkResultRecord, key) &&
              Object.hasOwnProperty.call(checkResultRecordColumns, key)
            ) {
              if (Object.hasOwnProperty.call(toFixedPropertyDict, key)) {
                const n = toFixedPropertyDict[key];
                const v = checkResultRecord[key];
                checkResultRecord[key] = toFixedFilter(v, n);
              }
              checkReportFormatted.push({
                label: checkResultRecordColumns[key],
                value: passedfilter(key, checkResultRecord[key]),
              });
            }
          }
          checkReportData.value = checkReportFormatted;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
    // 格式化时间戳为时间字符串
    function dataTimeFormatter(row, column) {
      return formatDate(new Date(row[column.property]), "yyyy-MM-dd HH:mm:ss");
    }
    // 探测数据 根据字典信息中定义的数据，保留n位小数点
    function toFixedFormatter(row, column) {
      const v = row[column.property];
      if (!Object.hasOwnProperty.call(toFixedPropertyDict, column.property))
        return v;
      const n = toFixedPropertyDict[column.property];
      return toFixedFilter(v, n);
    }

    return {
      toFixedFormatter,
      dataTimeFormatter,
      ...toRefs(date),
      disabledStartDate,
      disabledEndDate,
      timeType,
      tkyid,
      tkyids,
      isShowSelectTkyid,
      onClickSearch,
      handleTkyidChange,
      isRadioDisabled,
      dataType,
      handleDataTypeChange,
      isTCSJ,
      isSSZ,
      isJCBG,
      isCheckReport,
      checkReportData,
      baseTestReport,
      instantInfo,
      ...toRefs(state),
      tableData,
      // tkyDataColumns,
      totalCount,
      // handleDateForTCSJChange,
      handlePageSizeChange,
      handlePageNumberChange,
      // disabledDate,
      maxHeight,
      formatDate,
      goFirst,
      goLast,
    };
  },
};
</script>
