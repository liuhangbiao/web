import React from 'react';
import { connect } from 'dva';
import styles from './Wave.css';
import WaveComponent from '../components/Wave/Wave';

const Props={
	columns:[{
			  title: '序号',
			  dataIndex: '0',
			  render: text => <a href="#">{text}</a>
			},{
			  title: '频段范围',
			  dataIndex: 'a',
			  key: 'a',
			}, {
			  title: '频段名称',
			  dataIndex: 'b',
			  key: 'b',
			}, {
			  title: '合法正常信号',
			  dataIndex: 'c',
			  key: 'c',
			},{
			  title: '合法违规信号',
			  dataIndex: 'd',
			  key: 'd',
			},{
			  title: '已知信号',
			  dataIndex: 'e',
			  key: 'e',
			},{
			  title: '非法信号',
			  dataIndex: 'f',
			  key: 'f',
			},{
			  title: '不明信号',
			  dataIndex: 'g',
			  key: 'g',
			},{
			  title: '重点检测',
			  dataIndex: 'h',
			  key: 'h',
			}],
	data:[{
			  key: '1',
			  a: '胡彦斌',
			  b: 32,
			  c: '西湖区湖底公园1号'
			}, {
			  key: '2',
			  a: '胡彦祖',
			  b: 42,
			  c: '西湖区湖底公园1号'
			}]
}
function Wave() {
  return (
    <div className={styles.normal}>
     	 <WaveComponent {...Props}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Wave);
