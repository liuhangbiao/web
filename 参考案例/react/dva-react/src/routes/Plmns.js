import React from 'react';
import { connect } from 'dva';
import styles from './Plmns.css';

function Plmns() {
  return (
    <div className={styles.normal}>
      Route Component: Plmns
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Plmns);
