import React from 'react';
import { connect } from 'dva';
import styles from './Disturb.css';

function Disturb() {
  return (
    <div className={styles.normal}>
      Route Component: Disturb
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Disturb);
