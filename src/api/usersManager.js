import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

const IS_MOCK = true;
// const host = process.env.VUE_APP_HOST;
const host = import.meta.env.VITE_HOST;
const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    ElMessage({
      type: "error",
      message: error.message,
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export const userDict = {
  id: "ID",
  username: "用户名",
  dept: "部门名称",
  rolesString: "角色",
  userRealName: "用户真实姓名",
  // status: "用户状态",
};
/**
 * 获取所有用户
 */
export function getUserList() {
  const token = getToken();
  const url = "/api/UserManagement/getUserList";
  return IS_MOCK
    ? Promise.resolve([
        {
          userInfo: {
            id: 1,
            username: "admin2",
            password:
              "hash_$2a$11$rU0A2IGZgcCEczR711sfoeXvNJ2JuPI3m42LBoI3broVhDVoHZr82",
            loginid: null,
            dept: null,
            roles: "tk_admin,tk_maintainer,tk_jc_oper,tk_loader,tk_oper",
            userRealName: "管理员",
            status: "NORMAL",
            lastLoginTime: null,
            loginExpireTime: null,
            lastLogoutTime: null,
            avatar: null,
            ctime: 1613981691000,
            mtime: 1613981691000,
          },
        },
        {
          userInfo: {
            id: 2,
            username: "admin3",
            password:
              "hash_$2a$11$9qvJKW2Qo9AENfN48TqSLunVC8q4mew04mvr83ShnZSIRIozq8/fe",
            loginid: null,
            dept: null,
            roles: "tk_admin,tk_maintainer,tk_jc_oper,tk_loader,tk_oper",
            userRealName: "管理员",
            status: "NORMAL",
            lastLoginTime: null,
            loginExpireTime: null,
            lastLogoutTime: null,
            avatar: null,
            ctime: 1613981691000,
            mtime: 1613981691000,
          },
        },
        {
          userInfo: {
            id: 3,
            username: "zhangsan",
            password:
              "hash_$2a$11$wdH1.PkIqL20oV1asIEgK.WjYYrv9XIsdqTUDZI0aq2MD8sGQm71y",
            loginid: null,
            dept: "默认部门1",
            roles: "tk_admin",
            userRealName: "张三1",
            status: "NORMAL",
            lastLoginTime: null,
            loginExpireTime: null,
            lastLogoutTime: null,
            avatar: null,
            ctime: 1614278639000,
            mtime: 1614280109000,
          },
        },
      ])
    : request({
        url,
        method: "GET",
        params: {
          token,
        },
      });
}

/**
 * 获取角色
 */
export function getRoleNameList() {
  const token = getToken();
  const url = "/api/UserManagement/getRoleNameList";
  return IS_MOCK
    ? Promise.resolve([
        { 管理员: "tk_admin" },
        { 基测操作员: "tk_jc_oper" },
        { 裝载员: "tk_loader" },
        { 维护员: "tk_maintainer" },
        { 放球操作员: "tk_oper" },
      ])
    : request({
        url,
        method: "GET",
        params: {
          token,
        },
      });
}

/**
 * 添加用户
 * @param {object} params 用户数据对象
 * @param {string} params.dept
 * @param {string} params.password
 * @param {string} params.roles
 * @param {string} params.username
 * @param {string} params.realname
 * @returns {object} {"addUser":true}{"addUser":false}{"addUser":”当前用户无权限”}
 */
export function addUser(params) {
  const token = getToken();
  const url = "/api/UserManagement/addUser";
  return IS_MOCK
    ? Promise.resolve({ addUser: true })
    : request({
        url,
        method: "GET",
        params: {
          token,
          ...params,
        },
      });
}

/**
 * 修改用户
 * @param {object} params 用户数据对象
 * @param {string} params.id
 * @param {string} params.dept
 * @param {string} params.password
 * @param {string} params.roles
 * @param {string} params.username
 * @param {string} params.realname
 * @returns {object} {"updateUser":true}{"updateUser":false}{"updateUser":”当前用户无权限”}
 */
export function updateUser(params) {
  const url = "/api/UserManagement/updateUser";
  const token = getToken();
  return IS_MOCK
    ? Promise.resolve({ updateUser: true })
    : request({
        url,
        method: "GET",
        params: {
          token,
          ...params,
        },
      });
}
