// import {zh} from './config';
import * as cg from './config';
import { PAGE_SIZE } from './constants';
let lg=cg.zh;
/* 电波次序总览 */
const wave={
	//总体统计
    a:'/api/wave/a?page=${PAGE_SIZE}',
	//信号分类统计列表
	b:'/api/wave/b',
	//实时告警未确认
	c:'/api/wave/c',
	//实时告警已确认
	d:'/api/wave/d',
	//信号智能识别
	e:'/api/wave/e',
	//信号监测
	f:'/api/wave/f'
}
/* 信号管理 */
const signal={
	
}
/* 告警管理 */
/* 干扰管理 */
/* 公众移动通讯管理 */
export {lg,wave}


