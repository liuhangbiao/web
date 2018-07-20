import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import WaveComponent from '../components/Wave/Wave';
import {LocaleProvider,Icon} from 'antd';

/* 国际化 */
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('cn');
/* 国际化 */


function Wave({stockInData,dispatch,storeInfo}) {
	var db=storeInfo.infolist.list||[];
	var db1=storeInfo.alist.list||[];
	// console.log(db)
		  // sorter: true,
	const sort=(x,y)=>{
		return x.b - y.b
	}

	const Props={
		columns:[{
		  title: '序号',
		  dataIndex: 'id',
		  render: text => <a>{text}</a>
		},{
		  title: '频段范围',
		  dataIndex: 'a',
		  sorter: (x,y) =>  {
		  return x.a.split('-')[0] - y.a.split('-')[0]
		  }
		}, {
		  title: '频段名称',
		  dataIndex: 'b',
	      sorter: (x,y) =>  {
	      	return (x.b).localeCompare(y.b, "zh");
	      }
	     }, {
		  title: '告警数量',
		  dataIndex: 'c',
		  sorter: (x,y) =>x.c - y.c
		}, {
		  title: '合法正常信号',
		  dataIndex: 'd',
		  sorter: (x,y) =>x.d - y.d
		},{
		  title: '合法违规信号',
		  dataIndex: 'e',
		  sorter: (x,y) =>x.e - y.e
		},{
		  title: '已知信号',
		  dataIndex: 'f',
		  sorter: (x,y) =>x.f - y.f
		},{
		  title: '非法信号',
		  dataIndex: 'g',
		  sorter: (x,y) =>x.g - y.g
		},{
		  title: '不明信号',
		  dataIndex: 'h',
		  sorter: (x,y) =>x.h - y.h
		},{
		  title: '重点检测',
		  dataIndex: 'i',
		  className:'f-tc',
		  render: (text, record) => (
		  	<span>
		  	<Icon type="compass" />
		  {/*<b>{record.a}</b>*/}
		  	</span>
		  )
		}],
		data:db,
		columns1:[{
		  title: '序号',
		  dataIndex: 'id',
		  render: text => <a>{text}</a>
		},{
		  title: '频率(MHz)',
		  dataIndex: 'a',
		  sorter: (x,y) =>x.a - y.a
		},{
		  title: '首次出现时间',
		  dataIndex: 'b',
		  sorter: (x,y) =>x.b.split('-')[0] - y.b.split('-')[0]
		},{
		  title: '最后出现时间',
		  dataIndex: 'c',
		  sorter: (x,y) =>x.c.split('-')[0] - y.c.split('-')[0]
		},{
		  title: '监测站',
		  dataIndex: 'd',
		  sorter: (x,y) =>x.d - y.d
		},{
		  title: '告警内容',
		  dataIndex: 'e',
		  sorter: (x,y) =>x.e - y.e
		},{
		  title: '操作',
		  dataIndex: 'f',
		  render: text => <a>操作</a>
		}],
		data1:db1,
		add(){
	        console.log('添加')
	         dispatch({
			      type: 'wave/add',
			      payload: 1,
			    });
	    },
	    edit(){
	        console.log('编辑','此弹框内容是源自Store：'+storeInfo.id)
	    },
	    del(){
	        console.log('删除')
	    },
	    callback(){
	    	  dispatch({
			      type: 'wave/getInfoa',
			      payload: 1,
			    });
	    }
	}
  return (
    <div>
     <LocaleProvider locale={zhCN}>
      <WaveComponent {...Props}/>
      </LocaleProvider>
    </div>
  );
}


Wave.propTypes={
  dispatch:PropTypes.func
}


function mapStateToProps(stockInData) {
  	return {
        storeInfo:stockInData.wave
    };
}


export default connect(mapStateToProps)(Wave);
