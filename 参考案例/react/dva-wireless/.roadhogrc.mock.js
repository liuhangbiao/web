// 使用 Mock
const Mock = require('mockjs')
const Random=Mock.Random;
// Random.extend({
//     constellation: function(date) {
//         var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
//         return this.pick(constellations)
//     }
// })
// Random.constellation()
// Mock.mock('@CONSTELLATION')
// Mock.mock({
//     constellation: '@CONSTELLATION'
// })
export default {
   'GET /api/users': { users: [1,2] },
   'GET /api/users?_page=1&_limit=5': { users: [333,555] },
  // Method like GET or POST can be omitted
  '/api/users/1': { id: 1 },
  '/api/add/1': (req, res) => {  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}); res.end('添加成功'); },
  '/yy': {users: [1,2] },
  'POST /api/users/create': (req, res) => { res.end('OK'); },
  //wave -> 电波次序管理
  'GET /api/wave/info':Mock.mock({
	    'list|11-32': [{
	        'id|+1': 1,
          'key|+1': 1,
           a:()=>{return Random.natural(400, 500)+"-"+Random.natural(500, 600)},
           b:()=>{return Random.ctitle(4)+'监测站'},
           c:()=>{return Random.natural(0,120)},
           d:()=>{return Random.natural(0,120)},
           e:()=>{return Random.natural(0,120)},
           f:()=>{return Random.natural(0,120)},
           g:()=>{return Random.natural(0,120)},
           h:()=>{return Random.natural(0,120)}
      }]
  }),
  'GET /api/wave/a':Mock.mock({
      'list|1-50': [{
          'id|+1': 1,
           a:()=>{return Random.float(60, 170,2, 4)},
           b:()=>{return Random.datetime()},
           c:()=>{return Random.datetime()},
           d:()=>{return Random.ctitle(4)+'监测站'},
           e:()=>{return Random.pick(['电平升高', '电平降低', '电平维持', '电平未知'])}
      }]
  }),
  'GET /api/wave/b':Mock.mock({
      'list|1-50': [{
          'id|+1': 1,
           a:()=>{return Random.float(60, 170,2, 4)},
           b:()=>{return Random.datetime()},
           c:()=>{return Random.datetime()},
           d:()=>{return Random.ctitle(4)+'监测站'},
           e:()=>{return Random.pick(['电平升高', '电平降低', '电平维持', '电平未知'])}
      }]
  }),
  'GET /api/wave/c':Mock.mock({
      'list|1-50': [{
          'id|+1': 1,
           a:()=>{return Random.float(60, 170,2, 4)},
           b:()=>{return Random.datetime()},
           c:()=>{return Random.datetime()},
           d:()=>{return Random.ctitle(4)+'监测站'},
           e:()=>{return Random.pick(['电平升高', '电平降低', '电平维持', '电平未知'])}
      }]
  })
};
