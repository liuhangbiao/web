import React from 'react';
import { connect } from 'dva';
import styles from './Signal.css';

function Signal() {
  return (
    <div className={styles.normal}>
      Route Component: Signal
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Signal);
