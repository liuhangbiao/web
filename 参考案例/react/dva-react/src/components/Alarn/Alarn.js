import React,{PropTypes} from 'react';
import styles from './Alarn.css';

import { LocaleProvider, DatePicker, message,Button } from 'antd';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');


// import {IntlProvider, FormattedMessage} from 'react-intl';



// const { MonthPicker, RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';


// import { Table, Icon, Divider,pagination,Button} from 'antd';
// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   key: 'name',
//   render: text => <a href="#">{text}</a>,
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   key: 'age',
// }, {
//   title: 'Address',
//   dataIndex: 'address',
//   key: 'address',
// }, {
//   title: 'Action',
//   key: 'action',
//   render: (text, record) => (
//     <span>
//       <a href="#">Action 一 {record.name}</a>
//       <Divider type="vertical" />
//       <a href="#">Delete</a>
//       <Divider type="vertical" />
//       <a href="#" className="ant-dropdown-link">
//         More actions <Icon type="down" />
//       </a>
//     </span>
//   ),
// }];

// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   age: 42,
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   age: 32,
//   address: 'Sidney No. 1 Lake Park',
// }];

// const pg={
//   defaultCurrent:2,
//   total:3,
//   defaultPageSize:1
// }

// class Alarn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: ''
//     };
//   }
//   handleChange(date) {
//     message.info('您选择的日期是: ' + date.toString());
//     this.setState({ date });
//   }
//   render() {
//     return (
//       <p>
//        <Button type="primary">Primary</Button>
//     <Button>Default</Button>
//     <Button type="dashed">Dashed</Button>
//     <Button type="danger">Danger</Button>

//        <Table columns={columns} dataSource={data} pagination={pg} />
//       <LocaleProvider locale={zhCN}>
//         <div style={{ width: 400, margin: '100px auto' }}>
//           <DatePicker onChange={value => this.handleChange(value)} />
//           <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
//         </div>
//       </LocaleProvider>
//     	</p>
//     );
//   }
// }


function Alarn ({testId,testAlert,testAlertByStore,testUpdateStore}){
  return (
    <div>
      <Button onClick={()=>testAlert(testId)}>按此获取父组件TestKn内的testId值</Button>
      <Button onClick={()=>testAlertByStore()}>按此获取store内testId值</Button>
      <Button onClick={()=>testUpdateStore(20)}>按此更改store内testId值为20</Button>
    </div>
  )
}
Alarn.propTypes = {
   testId:PropTypes.number,
   testAlert:PropTypes.func,
   testAlertByStore:PropTypes.func,
   testUpdateStore:PropTypes.func
}
export default Alarn;
