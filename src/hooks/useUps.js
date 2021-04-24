import { ElMessage } from "element-plus";
import { computed, onMounted, reactive } from "vue";
import { getPowerStatus, getPowerParam, powerOn, powerOff } from "../api/ups";
import { getUpsParamDataMap } from "../data-map/ups";

export default function useUps() {
  onMounted(() => getData());
  const upsState = reactive({
    ups: [],
    loading: false,
    disabled: computed(() => {
      let r = false;
      //   const main = upsState.ups.find((value) => value.param === "MAIN");
      //   if (main) {
      //     r = !main.status;
      //   }
      return r;
    }),
  });

  async function getData() {
    let params = await getPowerParam();
    if (!(params && Array.isArray(params))) return;
    params = params.map(({ param }) => {
      const item = getUpsParamDataMap()[param];
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        param,
      };
    });
    const status = await getPowerStatus();
    if (!(status && Array.isArray(status))) return;
    status.map((item) => {
      for (const key in item) {
        const cur = params.find((value) => value.param === key);
        cur && (cur.status = item[key]);
      }
    });
    upsState.ups = params;
  }
  function open(v, item) {
    powerOn(item.param).then((res) => {
      console.log("powerOn -- ", res);
      upsState.loading = false;
      if (res.powerOn) {
        item.status = v;
      }
      ElMessage({
        type: res.powerOn ? "success" : "error",
        message: res.powerOn ? `打开${item.name}成功` : `打开${item.name}失败`,
        duration: res.powerOn ? 2000 : 3000,
      });
    });
  }
  function close(v, item) {
    powerOff(item.param).then((res) => {
      console.log("powerOff -- ", res);
      upsState.loading = false;
      if (res.powerOff) {
        item.status = v;
      }
      ElMessage({
        type: res.powerOff ? "success" : "error",
        message: res.powerOff ? `关闭${item.name}成功` : `关闭${item.name}失败`,
        duration: res.powerOff ? 2000 : 3000,
      });
    });
  }

  function onUpsChange(v, item) {
    if (upsState.loading) return;
    upsState.loading = true;
    item.status = !v;
    console.log(v, item);
    v ? open(v, item) : close(v, item);
  }

  return { upsState, onUpsChange };
}
