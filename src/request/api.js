/**
 * api接口统一管理
 */
import {get, post} from './http'

//登录
export const Login = p => post('/user/login', p);

export const dataIp = p => post('/ip/findLatest', p);
// 通话
export const findLast = p => post('/call/findLast', p);
export const callDetail = p => post('/callDetail/findByTerm', p);

//IP
export const findLatest = p => post('/ip/findLatest', p);

