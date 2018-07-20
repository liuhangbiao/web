import React,{PropTypes}  from 'react';
import { Card,Select,Row,Col,Table,Button} from 'antd';

const bodyStyle={
	padding:0
}
const gridStyle = {
  width: '10%',
  textAlign: 'right',
  border: 'none',
  boxShadow:'0 0 0 0',
  lineHeight:'1.618rem'
};

const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function Wave({columns,data}) {
  return (
  	<div>
      <Card title="电波次序总览" bodyStyle={bodyStyle} bordered={false} extra={<a  icon="close">X</a>}>
		    <Card.Grid style={gridStyle} >
		    	<Select defaultValue="默认" style={{ width: 100 }} onChange={handleChange}>
			      <Option value="成都">成都</Option>
			      <Option value="绵阳">绵阳</Option>
			      <Option value="南充" disabled>南充</Option>
			      <Option value="达州">达州</Option>
			    </Select>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<Row>
				  <Col span={24}>总告警数</Col>
				  <Col span={24}>100</Col>
				</Row>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<Row>
		    		<Col span={24}>未确认告警数</Col>
		    		<Col span={24}>100</Col>
		    	</Row>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<Row>
		    		<Col span={24}>已确认告警数</Col>
		    		<Col span={24}>100</Col>
		    	</Row>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<Row>
		    		<Col span={24}>智能识别信号数</Col>
		    		<Col span={24}>100</Col>
		    	</Row>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<Row>
		    		<Col span={24}>总信号数</Col>
		    		<Col span={24}>100 <Button type="primary">Primary</Button></Col>
		    	</Row>
		    </Card.Grid>
		  </Card>
		  <Table columns={columns} dataSource={data}/>
		</div>
  );
}
Wave.propTypes = {
   columns:PropTypes.array,
   data:PropTypes.array
}
export default Wave;
