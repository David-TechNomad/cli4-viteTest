<template>
  <div class="alert">
    <!-- 存活告警信息列表 -->
    <active-warning-message></active-warning-message>
    <!-- 筛选全部告警信息 -->
    <warning-message></warning-message>
  </div>
</template>

<script>
// import { ElNotification } from "element-plus";
import ActiveWarningMessage from "../components/ActiveWarningMessage.vue";
import WarningMessage from "../components/WarningMessage.vue";
// import { onMounted, onUnmounted } from "vue";
// import voiceMap from "../assets/voice/voiceMap.js";
// import { Howl } from "howler";
// import useEventBus from "../hooks/useEventBus";
// import useMyAudio from "../hooks/useMyAudio";
// import useAudioQueue from "../hooks/useAudioQueue";
// import emitter from "../hooks/useMitt";
// import { sleep } from "../utils/utils";

// const queue = useAudioQueue();
// const audio1 = useMyAudio();
// let isAdded = false;

export default {
  components: {
    ActiveWarningMessage,
    WarningMessage,
  },
  setup() {
    // let notificationInstance = null;
    // async function showWarnings(o) {
    //   const alarm = o.alarm;
    //   const colorMap = {
    //     VERY_SERIOUS: { background: "#f40", color: "#fff" },
    //   };
    //   notificationInstance = ElNotification({
    //     title: alarm.alarmComponent,
    //     type: "info",
    //     message: `<div style="display:inline-block;color:#f40;">${alarm.alarmName}</div>`,
    //     // message: `<div style="display:inline-block;background-color: ${
    //     //   colorMap[alarm.alarmLevel].background
    //     // };color: ${colorMap[alarm.alarmLevel].color};">${
    //     //   alarm.alarmName
    //     // }</div>`,
    //     dangerouslyUseHTMLString: true,
    //     duration: 3000,
    //     onClick: function () {
    //       closeWarnings();
    //       // play();
    //     },
    //   });
    // }
    // function closeWarnings() {
    //   notificationInstance.close();
    // }
    // const IS_MOCK = true;
    // useEventBus("Warning", ebHandler, {
    //   IS_MOCK,
    //   mockDataName: "alarmInfo",
    //   times: 5,
    //   timeout: 100,
    // });
    // function ebHandler(alarmInfo) {
    //   console.info("eventbus来消息了！");
    //   add(alarmInfo);
    // }
    // function add(o) {
    //   const alarm = o.alarm;
    //   const src = voiceMap[alarm.alarmName] || voiceMap["未找到报警语音"];
    //   o.src = src;
    //   queue.add(o);
    // }
    // let queueTimer = [];
    // function startCheckQueue() {
    //   console.info("audio queue length -- ", queue.getLength());
    //   if (queue.getLength()) {
    //     queueTimer.map((timer) => clearTimeout(timer));
    //     handleAlarm();
    //     return;
    //   }
    //   const timer = setTimeout(() => {
    //     console.info("audio queue is empty !");
    //     startCheckQueue();
    //   }, 3000);
    //   queueTimer.push(timer);
    // }
    // function stopCheckQueue() {
    //   queueTimer.map((timer) => clearTimeout(timer));
    //   audio1.removeListener("ended", onEnded);
    //   audio1.setSrc(null);
    //   audio1.isPlaying = false;
    // }
    // function handleAlarm() {
    //   if (audio1.isPlaying) return;
    //   // if (!audio1.src.endsWith("null")) return;
    //   const o = queue.get();
    //   if (!o) return;
    //   audio1.isPlaying = true;
    //   showWarnings(o);
    //   const src = o.src;
    //   if (!src) return;
    //   console.info("alarm level -- ", o.alarm.alarmLevel);
    //   audio1.setSrc(src);
    // }
    // audio1.addListener("ended", onEnded);
    // function onEnded() {
    //   console.info("current audio play finished");
    //   audio1.setSrc(null);
    //   audio1.isPlaying = false;
    //   startCheckQueue();
    // }
    // function emitterFn(e) {
    //   if (isAdded) return;
    //   if (Array.isArray(e)) {
    //     e.map((item) => add(item));
    //     isAdded = true;
    //   }
    // }
    // emitter.on("alarm", emitterFn);
    // onUnmounted(() => {
    //   console.info("onUnmounted...");
    //   stopCheckQueue();
    //   emitter.off("alarm", emitterFn);
    // });
    // onMounted(async () => {
    //   console.info("onMounted...2秒后开始检查audio队列是否有消息！");
    //   await sleep(2000);
    //   startCheckQueue();
    // });
  },
};
</script>

<style lang="scss" scoped>
.alert {
  width: 100%;
  height: 100%;
}
</style>
