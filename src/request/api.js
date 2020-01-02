/**
 * api接口统一管理
 */
import {get, post} from './http'

//登录
export const Login = p => post('/user/login', p);
export const warning = p => post('/warning', p)


