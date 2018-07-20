import React from 'react';

import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

// function ProductList() {
//   return (
//     <div className={styles.normal}>
//       Component: ProductList
//     </div>
//   );
// }

export default ProductList;
