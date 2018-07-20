// 使用 Mock
// var Mock = require('mockjs')
export default {
	  // Support type as Object and Array
  'GET /api/users': { users: [1,2] },
  // Method like GET or POST can be omitted
  '/api/users/1': { id: 1 },
  '/yy': {users: [1,2] },
 //  '/dd':Mock.mock({
	//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	//     'list|1-10': [{
	//         // 属性 id 是一个自增数，起始值为 1，每次增 1
	//         'id|+1': 1
	//     }]
	// }),
  // Support for custom functions, the API is the same as express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
