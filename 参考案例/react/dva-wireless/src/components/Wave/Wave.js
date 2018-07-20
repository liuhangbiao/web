import React,{PropTypes}  from 'react';
import styles from './Wave.css';
import { Card,Select,Row,Col,Table,Button,Icon,Tabs} from 'antd';
const { Meta } = Card;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const page={
  showSizeChanger:true,
  showQuickJumper:true,
  showTotal:(total)=>`共${total}条记录`
}
const gridStyle={
     width: '10%',
     boxShadow:'0 0 0 #fff'
}
// const callback=(key)=>{
//   console.log(key);
// }
function Wave({columns,data,columns1,data1,add,edit,del,callback}) {
  return (
    <div className={styles.normal}>
         <Card title="电波次序管理" bordered={false} bodyStyle={{padding:'0 0'}} extra={<Button  value="small"><Icon type="eye-o"/>电磁环境评估</Button>}>
                  <Card.Grid style={gridStyle}>
                  <Select  defaultValue='成都市' style={{ width: 140 }}>
                    <Option value="成都市">成都市</Option>
                    <Option value="绵阳市">绵阳市</Option>
                    <Option value="南充市">南充市</Option>
                    <Option value="达州市">达州市</Option>
                  </Select>
                  </Card.Grid>
                   <Card.Grid style={gridStyle}><Meta title="总告警数"  description="100"/></Card.Grid>
                   <Card.Grid style={gridStyle}><Meta title="未处理告警数"  description="54"/></Card.Grid>
                   <Card.Grid style={gridStyle}><Meta title="已处理告警数"  description="104"/></Card.Grid>
                   <Card.Grid style={gridStyle}><Meta title="智能信号识别数"  description="83"/></Card.Grid>
                   <Card.Grid style={gridStyle}><Meta title="总信号数"  description="437"/></Card.Grid>
        </Card>
     	  {/*<Button onClick={add}>添加</Button>
	      <Button onClick={edit}>编辑</Button>
	      <Button onClick={del}>删除</Button>*/}
	      <Table columns={columns}  dataSource={data} rowKey={record => record.id} size='small' className={styles.wtable} pagination={page}/>
        <Tabs onChange={callback} type="card">
          <TabPane tab="实时告警未确认" key="1">
             <Table columns={columns1}  dataSource={data1} rowKey={record => record.id} size='small' className={styles.wtable} pagination={page}/>
          </TabPane>
          <TabPane tab="实时告警已确认" key="2">
              <Table columns={columns1}  dataSource={data1} rowKey={record => record.id} size='small' className={styles.wtable} pagination={page}/>
          </TabPane>
          <TabPane tab="信号智能识别" key="3">
            <Table columns={columns1}  dataSource={data1} rowKey={record => record.id} size='small' className={styles.wtable} pagination={page}/>
          </TabPane>
        </Tabs>
    </div>
  );
}

Wave.propTypes = {
   columns:PropTypes.array,
   data:PropTypes.array,
   add:PropTypes.func,
   edit:PropTypes.func,
   del:PropTypes.func
}
export default Wave;