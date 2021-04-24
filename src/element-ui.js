import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElPagination,
  ElLoading,
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElBadge,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSteps,
  ElStep,
  ElDrawer,
  ElDialog,
  ElCheckbox,
  ElIcon,
} from "element-plus";

const components = [
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElPagination,
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElBadge,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElSwitch,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSteps,
  ElStep,
  ElDrawer,
  ElDialog,
  ElCheckbox,
];

const plugins = [ElLoading];

function useElementUi(app) {
  components.map((component) => {
    app.component(component.name, component);
  });
  plugins.map((plugin) => {
    app.use(plugin);
  });
}

export default useElementUi;
