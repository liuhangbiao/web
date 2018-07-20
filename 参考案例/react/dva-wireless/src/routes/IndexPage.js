import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { LocaleProvider,DatePicker } from 'antd';


// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
const { MonthPicker, RangePicker,message } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>大公博创无线电综合管理平台</h1>
      <div className={styles.welcome} />
      <LocaleProvider locale={zhCN}>
          <DatePicker onChange={value => this.handleChange(value)} />
      </LocaleProvider>
      <p>你也可以直接访问<code>http://localhost:8000/</code> 入口.</p>
      <ul className={styles.list}>
        <li><a href="#/wave">电波次序总览</a></li>
        <li><a href="#/signal">信号管理</a></li>
        <li><a href="#/alarn">告警管理</a></li>
        <li><a href="#/disturb">干扰管理</a></li>
        <li><a href="#/plmns">公众移动通信管理</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
