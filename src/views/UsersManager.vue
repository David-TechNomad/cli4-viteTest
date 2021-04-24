<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24" :offset="0" :style="{ paddingBottom: '10px' }">
        <el-button type="primary" size="small" @click="addUserHandler">
          添加用户
        </el-button>
      </el-col>
    </el-row>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div>用户列表</div>
      </template>
      <el-table v-loading="userListLoading" :data="userList" border stripe>
        <el-table-column
          v-for="col in columns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="updateUserHandler(scope.row)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <!-- 添加用户 -->
  <el-dialog
    title="添加用户"
    v-model="isShowAddUser"
    width="70%"
    :destroy-on-close="true"
    @close="onAddUserClose"
    :close-on-click-modal="false"
  >
    <el-form :model="addUserForm" label-width="180px" label-position="right">
      <el-form-item label="用户名">
        <el-input v-model="addUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户真实姓名">
        <el-input v-model="addUserForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="addUserForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="addUserForm.dept"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          :style="{ width: '100%' }"
          v-model="addUserForm.roles"
          multiple
          placeholder="请选择角色(可多选)"
        >
          <el-option
            v-for="role in roles"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addUserCancelHandler" size="mini"> 取消 </el-button>
      <el-button type="primary" @click="addUserOkHandler" size="mini">
        提交
      </el-button>
    </template>
  </el-dialog>

  <!-- 修改用户 -->
  <el-dialog
    title="修改用户"
    v-model="isShowUpdateUser"
    width="70%"
    :destroy-on-close="true"
    @close="onUpdateUserClose"
    :close-on-click-modal="false"
  >
    <el-form :model="updateUserForm" label-width="180px" label-position="right">
      <el-form-item label="用户名">
        <el-input v-model="updateUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户真实姓名">
        <el-input v-model="updateUserForm.realname" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="updateUserForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="updateUserForm.dept"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          :style="{ width: '100%' }"
          v-model="updateUserForm.roles"
          multiple
          placeholder="请选择角色(可多选)"
        >
          <el-option
            v-for="role in roles"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="updateUserCancelHandler" size="mini"> 取消 </el-button>
      <el-button type="primary" @click="updateUserOkHandler" size="mini">
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, toRaw, toRefs } from "vue";
import {
  getUserList,
  userDict,
  getRoleNameList,
  addUser,
  updateUser,
} from "../api/usersManager";
import { ElMessage } from "element-plus";
import { showMessage } from "../utils/utils";
export default {
  setup() {
    onMounted(async () => {
      await getRoles();
      await getUser();
    });
    const state = reactive({
      userListLoading: false,
      userList: [],
      columns: [],
      roles: [],
    });

    function getColumns(data) {
      const columns = [];
      const userInfo = data[0];
      for (const key in userInfo) {
        if (userInfo.hasOwnProperty(key) && userDict.hasOwnProperty(key)) {
          const element = userDict[key];
          columns.push({
            prop: key,
            label: element,
          });
        }
      }
      return columns;
    }
    function formatRole(role) {
      return Object.keys(role).reduce((prev, current) => {
        prev.label = current;
        prev.value = role[current];
        return prev;
      }, {});
    }
    function formatRoles(data) {
      return data.map((role) => formatRole(role));
    }
    function getRoles() {
      getRoleNameList().then((res) => {
        if (res?.length) {
          state.roles = formatRoles(res);
        }
      });
    }
    function formatUserInfo(user) {
      user.rolesString = user?.roles
        .split(",")
        .reduce((prev, current) => {
          if (state.roles.length) {
            toRaw(state.roles).map((item) => {
              if (item.value === current) {
                prev.push(item.label);
              }
            });
          }
          return prev;
        }, [])
        .join(",");
      return user;
    }
    function getUser() {
      state.userListLoading = true;
      getUserList()
        .then((res) => {
          if (res?.length) {
            state.userList = res.map((item) => formatUserInfo(item.userInfo));
            state.columns = getColumns(toRaw(state.userList));
          }
        })
        .finally(() => (state.userListLoading = false));
    }

    function addUserHandler() {
      addUserState.addUserForm = { ...addUserFormDefault };
      addUserState.isShowAddUser = true;
    }
    function updateUserHandler(user) {
      const options = {
        id: user.id,
        username: user.username,
        realname: user.userRealName,
        password: "",
        dept: user.dept,
        roles: user.roles.split(","),
        status: user.status,
      };
      updateUserState.updateUserForm = { ...options };
      updateUserState.isShowUpdateUser = true;
    }

    function addUserCancelHandler() {
      addUserState.isShowAddUser = false;
    }
    function addUserOkHandler() {
      const options = toRaw(addUserState.addUserForm);
      options.roles = options.roles.join(",");
      addUser(options)
        .then((res) => {
          showMessage(res.addUser);
          res.addUser === true && getUser();
        })
        .finally(() => {
          addUserState.isShowAddUser = false;
        });
    }
    const addUserFormDefault = {
      username: "",
      realname: "",
      password: "",
      dept: "",
      roles: [],
    };
    const addUserState = reactive({
      isShowAddUser: false,
      addUserForm: { ...addUserFormDefault },
    });
    function onAddUserClose() {
      addUserState.addUserForm = { ...addUserFormDefault };
    }
    const updateUserFormDefault = {
      id: "",
      username: "",
      realname: "",
      password: "",
      dept: "",
      roles: [],
      status: "",
    };
    const updateUserState = reactive({
      isShowUpdateUser: false,
      updateUserForm: { ...updateUserFormDefault },
    });
    function updateUserCancelHandler() {
      updateUserState.isShowUpdateUser = false;
    }
    function updateUserOkHandler() {
      const rawData = toRaw(updateUserState.updateUserForm);
      const options = {
        id: rawData.id,
        username: rawData.username,
        realname: rawData.realname,
        dept: rawData.dept,
        roles: rawData.roles.join(","),
      };
      if (rawData.password) {
        options.password = rawData.password;
      }
      updateUser(options)
        .then((res) => {
          showMessage(res.updateUser);
          res.updateUser === true && getUser();
        })
        .finally(() => (updateUserState.isShowUpdateUser = false));
    }
    function onUpdateUserClose() {
      updateUserState.updateUserForm = { ...updateUserFormDefault };
    }
    return {
      ...toRefs(state),
      userDict,
      addUserHandler,
      updateUserHandler,
      ...toRefs(addUserState),
      addUserCancelHandler,
      addUserOkHandler,
      onAddUserClose,
      ...toRefs(updateUserState),
      updateUserCancelHandler,
      updateUserOkHandler,
      onUpdateUserClose,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>