import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import styles from './Alarn.css';
import AlarnComponent from '../components/Alarn/Alarn';

function Alarn({stockInData,dispatch,storeInfo}) {
  const TestProps={
      testId:5,
      testAlert(value){
        alert("此弹框是源自TestKn："+value);
      },
      testAlertByStore(){
          alert("此弹框内容是源自Store："+storeInfo.testId);
      },
      testUpdateStore(value){
         dispatch({
          type: 'testKn/update',
          payload: { testId: value }
        })
      }
  }
  return (
    <div className={styles.normal}>
     	<AlarnComponent  {...TestProps}/>
    </div>
  );
}

Alarn.propTypes={
  dispatch:PropTypes.func
}

function mapStateToProps(stockInData) {
  	return {
        storeInfo:stockInData.alarn
    };
}

export default connect(mapStateToProps)(Alarn);


