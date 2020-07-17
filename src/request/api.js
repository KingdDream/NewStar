/**
 * api接口统一管理
 */
import {
  get,
  post
} from './http'

//登录
// export const Login = p => post('user/login', p);

// // 通话
// export const callDetail = p => post('callDetail/findByTerm', p); //通话量列表
// export const findLast = p => post('call/findLast', p); //通话量统计
// export const clickremove = p => post('callDetail/removeState', p); //删除通话量信息

// //时隙监控
// export const findUeTimeslot = p => post('director/findUeTimeslot', p);
// //终端监控
// export const findAll = p => post('ue/findAll', p);//查询终端
// export const removeState = p => post('ue/removeState', p);//删除终端
// //承载情况
// //socket
// //告警信息/
// export const selByTerm = p => post('warningLog/selByTerm', p);//故障查询 
// export const isRead = p => post('warningLog/isRead', p); //故障已读
// export const isDone = p => post('warningLog/isDone', p); //故障确认 
// export const selLogs = p => post('dailyLog/selLogs', p); //操作日志

// //IP吞吐
// export const findLatest = p => post('ip/findLatest', p); //ip上下行
// //系统运行
// export const findRun = p => post('system/findRun', p); //运行设备
// export const findDetails = p => post('system/findDetails', p); //设备参数
// export const removeStateSystem= p => post('system/removeState', p); //删除设备
// //用户管理 
// export const searchUsers= p => post('user/findUserMessageByUID', p); //搜索用户
// export const listUsers= p => post('user/findUserMessages', p); //用户列表
// export const addUsers= p => post('user/userRigist', p); //添加用户
// export const changeUser= p => post('user/changeUser', p); //更改用户
// export const delUser= p => post('user/delUser', p); //删除用户 
// export const addUserGroup= p => post('group/addUsers', p); //添加组成员
// export const removeGroupUser= p => post('group/removeUsers', p); //删除组成员
// //组别 
// export const listGroup= p => post('group/findGroups', p); //查询组别 
// export const addGroup= p => post('group/add', p); //添加组别 
// export const modifyGroup= p => post('group/modify', p); //修改组别信息
// export const removeGroup= p => post('group/remove', p); //删除组别

// //权限
// export const findPermissionsByUID= p => post('permission/findPermissionsByUID', p); //用户权限
// export const addUserPermissions= p => post('permission/addUserPermissions', p); //添加用户权限
// export const delUserPermissions= p => post('permission/delUserPermissions', p); //删除用户权限

// export const findPermissionsGroup= p => post('group/findPermissions', p); //组权限
// export const addPermissonsGroup= p => post('group/addPermissons', p); //添加组权限
// export const delPermissionsGroup= p => post('group/delPermissions', p); //删除组权限



  
  export const Login = p => post('http://192.168.1.104:8080/cms/user/login', p);
  export const callDetail = p => post('http://192.168.1.104:8080/cms/callDetail/findByTerm', p); //通话量列表
  export const findLast = p => post('http://192.168.1.104:8080/cms/call/findLast', p); //通话量统计
  export const clickremove = p => post('http://192.168.1.104:8080/cms/callDetail/removeState', p); //删除通话量信息
  export const findUeTimeslot = p => post('http://192.168.1.104:8080/cms/director/findUeTimeslot', p);
  export const findAll = p => post('http://192.168.1.104:8080/cms/ue/findAll', p);//查询终端
  export const removeState = p => post('http://192.168.1.104:8080/cms/ue/removeState', p);//删除终端
  export const selByTerm = p => post('http://192.168.1.104:8080/cms/warningLog/selByTerm', p);//故障查询 
  export const isRead = p => post('http://192.168.1.104:8080/cms/warningLog/isRead', p); //故障已读
  export const isDone = p => post('http://192.168.1.104:8080/cms/warningLog/isDone', p); //故障确认 
  export const selLogs = p => post('http://192.168.1.104:8080/cms/dailyLog/selLogs', p); //操作日志
  export const findLatest = p => post('http://192.168.1.104:8080/cms/ip/findLatest', p); //ip上下行
  export const findRun = p => post('http://192.168.1.104:8080/cms/system/findRun', p); //运行设备
  export const findDetails = p => post('http://192.168.1.104:8080/cms/system/findDetails', p); //设备参数
  export const removeStateSystem= p => post('http://192.168.1.104:8080/cms/system/removeState', p); //删除设备
  export const searchUsers= p => post('http://192.168.1.104:8080/cms/user/findUserMessageByUID', p); //搜索用户
  export const listUsers= p => post('http://192.168.1.104:8080/cms/user/findUserMessages', p); //用户列表
  export const addUsers= p => post('http://192.168.1.104:8080/cms/user/userRigist', p); //添加用户
  export const changeUser= p => post('http://192.168.1.104:8080/cms/user/changeUser', p); //更改用户
  export const delUser= p => post('http://192.168.1.104:8080/cms/user/delUser', p); //删除用户 
  export const addUserGroup= p => post('http://192.168.1.104:8080/cms/group/addUsers', p); //添加组成员
  export const removeGroupUser= p => post('http://192.168.1.104:8080/cms/group/removeUsers', p); //删除组成员
  export const listGroup= p => post('http://192.168.1.104:8080/cms/group/findGroups', p); //查询组别 
  export const addGroup= p => post('http://192.168.1.104:8080/cms/group/add', p); //添加组别 
  export const modifyGroup= p => post('http://192.168.1.104:8080/cms/group/modify', p); //修改组别信息
  export const removeGroup= p => post('group/remove', p); //删除组别
  export const findPermissionsByUID= p => post('http://192.168.1.104:8080/cms/permission/findPermissionsByUID', p); //用户权限
  export const addUserPermissions= p => post('http://192.168.1.104:8080/cms/permission/addUserPermissions', p); //添加用户权限
  export const delUserPermissions= p => post('http://192.168.1.104:8080/cms/permission/delUserPermissions', p); //删除用户权限
  export const findPermissionsGroup= p => post('http://192.168.1.104:8080/cms/group/findPermissions', p); //组权限
  export const addPermissonsGroup= p => post('http://192.168.1.104:8080/cms/group/addPermissons', p); //添加组权限
  export const delPermissionsGroup= p => post('http://192.168.1.104:8080/cms/group/delPermissions', p); //删除组权限
  
  