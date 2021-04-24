import { createStore } from "vuex";
import { getSystemMode, setSystemMode } from "../api/systemMode";
import { mode } from "../data-map/systemMode";
import { releaseStepMap } from "../data-map/releaseStep";
import { ElMessage } from "element-plus";
import { getReleaseStep } from "../api/releaseStep";
import stepsVioce from "../assets/steps/index";
import getMyAudio from "../utils/myAudio";
const startStep = ["WAITING_COMMAND"];
const overStep = ["SOUNDING_TERMINATED", "SOUNDING_ABORTED"];

const myAudio = getMyAudio();
function playStepsVioce(item) {
  const src = stepsVioce[item.title];
  myAudio.setSrc(src);
}

export default createStore({
  state: {
    systemMode: "",
    steps: [],
  },
  mutations: {
    SET_STEPS(state, value) {
      state.steps = value;
    },
    SET_SYSTEM_MODE(state, value) {
      state.systemMode = value;
    },
  },
  actions: {
    async setReleaseStep({ state, commit }, releaseStep) {
      const steps = state.steps;
      let mapItem = null;
      if (overStep.includes(releaseStep)) {
        mapItem = releaseStepMap.OVER;
      } else {
        mapItem = releaseStepMap[releaseStep];
      }
      const cur = steps.find((item) => item.id === mapItem?.id);
      if (cur) {
        cur.status = true;
      }
      if (startStep.includes(releaseStep)) {
        steps.map((item) => {
          item.status = !(item.id > mapItem.id);
          return item;
        });
      }
      commit("SET_STEPS", steps);
      console.info("steps from event bus -- ", mapItem);
      playStepsVioce(mapItem);
    },
    async getReleaseStep({ commit }) {
      const result = await getReleaseStep();
      console.info("get release step -- ", result);
      const arr = Object.values(releaseStepMap);
      if (overStep.includes(result.ReleaseStep)) {
        const overItem = arr.find((item) => item.isOver);
        if (overItem) {
          overItem.status = true;
        }
        commit("SET_STEPS", arr);
      } else {
        const cur = releaseStepMap[result.ReleaseStep];
        arr.map((item) => {
          item.status = !item.isOver && item.id <= cur.id;
          return item;
        });
        commit("SET_STEPS", arr);
      }
      // console.info("steps from get method --", arr);
    },
    async setSystemMode({ commit }, value) {
      const result = await setSystemMode(value);
      if (result.setSystemMode) {
        commit("SET_SYSTEM_MODE", value);
        ElMessage({
          type: "success",
          message: "设置成功",
          duration: 2000,
        });
      } else {
        ElMessage({
          type: "error",
          message: "设置失败",
          duration: 3000,
        });
      }
    },
    async getSystemMode({ commit }) {
      const result = await getSystemMode();
      commit("SET_SYSTEM_MODE", result.SystemMode);
    },
  },
  getters: {
    systemMode(state) {
      return mode[state.systemMode];
    },
  },
  modules: {},
});
