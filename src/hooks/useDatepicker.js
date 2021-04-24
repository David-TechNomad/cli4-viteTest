import { reactive } from "vue";
export default function useDatepicker() {
  const date = reactive({
    startDate: "",
    endDate: "",
  });
  function disabledStartDate(d) {
    if (!date.endDate) return;
    return d.getTime() >= +date.endDate;
  }
  function disabledEndDate(d) {
    if (!date.startDate) return;
    return d.getTime() <= +date.startDate;
  }
  return { date, disabledStartDate, disabledEndDate };
}
