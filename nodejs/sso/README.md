不务正业的前端之SSO（单点登录）实践
引言
首先为什么是不务正业呢...因为我们公司就我一个前端，不乖乖写页面写什么SSO。我之所以会想到去写SSO单点登录呢，一是发现公司的登录这块特别的乱，每个系统都是独立的登录，而某些业务都是有所交集的，既然一个是a.xxx.com一个是b.xxx.com，那为什么不把登录统一一下呢...正巧赶上我们后端大哥在攻坚一个技术难关，于是乎我在等接口的间隙就着手写了一下单点登录。

技术栈方面，后端采用 NodeJS 去实现，局部会话用 express-session 维护， session 的存储使用了 redis ，由于目前的项目都是前后端分离的，为了更加契合当前的业务逻辑，把常规的跳转至 passport 认证服务器登录这部分改造成接口的方式，这样使得这个 SSO 比较适合用在 SPA 中。

下面将具体阐述实现以及总结一些需要注意的点，愿在下的拙见对大家能有所帮助。

实现原理
SSO即Single Sign On，是指在多系统应用群中登录一个系统，便可在其他所有系统中得到授权而无需再次登录。 SSO一般都需要一个独立的认证中心（passport），子系统的登录均得通过passport，子系统本身将不参与登录操作，当一个系统成功登录以后，passport将会颁发一个令牌给各个子系统，子系统可以拿着令牌会获取各自的受保护资源，为了减少频繁认证，各个子系统在被passport授权以后，会建立一个局部会话，在一定时间内可以无需再次向passport发起认证。

如图所示，是一个比较常见的SSO实现，图片取自


上面这张图很详细地描述了一个SSO的请求资源的流程。但是这里有一点地方不适合我当前的业务场景，那就是我并不希望在登录的时候跳转到认证中心，所以我把这个部分转化成了接口的方式去实现，其他的实现基本如图一致。
具体实现
准备环境
首先需要做一些准备工作，为了方便测试SSO，需要至少三个域名，这边我直接在本地模拟。如果手头有服务器域名的，这一步自然就可以跳过了。

构造本地域名（Mac）
1. 配置hosts文件
// MacOS
sudo vim /etc/hosts
// 添加以下三行
127.0.0.1   testssoa.xxx.com
127.0.0.1   testssob.xxx.com
127.0.0.1   passport.xxx.com
复制代码
2. 添加nginx反向代理配置
先安装nginx
添加对应站点的配置
vim /usr/local/etc/nginx/nginx.conf

// 添加以下3个代理
server {
  listen 1280;
  server_name passport.xxx.com;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:11000;
  }
}

server {
  listen 1280;
  server_name testssoa.xxx.com;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:11001;
  }
}

server {
  listen 1280;
  server_name testssob.xxx.com;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:11002;
  }
}
复制代码
nginx -t 检测配置是否有效
nginx -s reload 重启nginx
准备一份简单的登录页面

页面大概就长这个样子，这里分别要准备testssoa和testssob两个域名，为了公用一个页面这里我采用的方案是直接通过node将该页面render回来的方式，并且需要根据上面nginx配置的端口号启动端口指定为11001和11002的服务。
// package.json
"scripts": {
  "start": "babel-node passport.js",
  "starta": "cross-env NODE_ENV=ssoa babel-node index.js",
  "startb": "cross-env NODE_ENV=ssob babel-node index.js"
}

// index.js
import express from 'express' // import需要babel支持
const app = express()
const mapPort = {
  'ssoa': 11001,
  'ssob': 11002
}
const port = mapPort[process.env.NODE_ENV]
if (port) {
  console.log('listen port: ', port)
  app.listen(port)
}
复制代码
简单的配置一下，这样可以直接通过npm run starta和npm run startb来起来两个server

具体步骤
1. 用户登录
登录全部向paspport发起，这里采用了jwt来维护用户的登录态（考虑到app端），登录成功以后会把token存储到redis中，并且将token写入domain为xxx.com这个顶级域名中，这样的话不同的子系统都可获得token，同时设置httpOnly可以预防一部分xss攻击。

app.post('/login', async (req, res, next) => {
  // 登录成功则给当前domain下的cookie设置token
  const { username, password } = req.body

  // 通过 username 跟 password 取出数据库中的用户
  try {
    const user = await authUser(username, password)
    const lastToken = user.token
    // 此处生成token，此处使用jwt
    const newToken = jwt.sign(
      { username, id: user.id },
      tokenConfig.secret,
      { expiresIn: tokenConfig.expiresIn }
    )
    // 保存token到redis中
    await storeToken(newToken)

    // 生成新的token以后需要清除子系统的session
    if (lastToken) {
      await clearClientStore(lastToken)
      await deleteToken(lastToken)
    }

    res.setHeader(
      'Set-Cookie',
      `token=${newToken};domain=xxx.com;max-age=${tokenConfig.expiresIn};httpOnly`)

    return res.json({
      code: 0,
      msg: 'success'
    })
  } catch (err) {
    next(new Error(err))
  }
})
复制代码
2. 用户访问受保护资源（认证过程）
登录成功以后，我们可以尝试去获取受保护资源，由于passport对domain为xxx.com的域名设置了cookie，所以无论是a.xxx.com还是b.xxx.com均可使用该cookie去向各自的服务器去发起资源的请求。前面有提到，请求资源之前需要进行认证，认证成功以后将会生成局部会话，之后的请求都可以在一定时间内无需认证。

// 发起一个认证请求
const authenticate = async (req) => {
  const cookies = splitCookies(req.headers.cookie)
  // 判断是否含有token，如没有token，则返回失败分支
  const token = cookies['token']
  if (!token) {
    throw new Error('token is required.')
  }

  const sid = cookies['sid']

  // 如果获取到user，则说明该用户已经登录
  if (req.session.user) {
    return req.session.user
  }

  // 向passport服务器发起一个认证请求
  try {
    // 这里的sid应该是存在redis里的key
    let response = await axiosInstance.post('/authenticate', {
      token,
      sid: defaultPrefix + req.sessionID,
      name: 'xxxx' // 可以用来区分具体的子系统
    })
    if (response.data.code !== 0) {
      throw new Error(response.data.msg)
    }
    // 认证成功则建立局部会话，并将用户标识保存起来，比如这里可以是一个uid，或者也可以是token
    req.session.user = response.data.data
    req.session.save()

    return response.data
  } catch (err) {
    throw err
  }
}
复制代码
对于需要接入SSO的子系统来说，真正需要做的事情就只有发起认证这一件事情，所以对于子系统本身来说，接入成本是很低的。即便不同语言的子系统实现的方式会有所差别，但是也没什么关系，这里最核心的一件事情就是向passport发起认证，只需要按照约定把认证所需要的参数传递过去即可，剩下的事情都应该交给passport来操心。

认证成功以后获取具体的资源则由各个子系统各自执行。

3. 认证环节（passport）
认证这一环节主要是检验token的有效性，一是检验该token是否存在于redis之中，二是校验该token是否还有效，是否过期，并且解析出其中的用户信息，校验成功以后需要将子系统注册一下（存入redis，以token为key），方便后续注销。这里还加了一个小判断，就是判断x-real-ip的，可以防范一定程度的伪造。

app.post('/authenticate', async (req, res, next) => {
  const { token, sid, name } = req.body
  try {
    // 检查请求的真实IP是否为授权系统
    // nginx会将真实IP传过来，伪造x-forward-for是无效的
    if (!checkSecurityIP(req.headers['x-real-ip'])) {
      throw new Error('ip is invalid')
    }
    // 判断token是否还存在于redis中并验证token是否有效, 取得用户名和用户id
    const tokenExists = await redisClient.existsAsync(token)
    if (!tokenExists) {
      throw new Error('token is invalid')
    }
    const { username, id } = await jwt.verify(token, tokenConfig.secret)
    // 校验成功注册子系统
    register(token, sid, name)
    return res.json({
      code: 0,
      msg: 'success',
      data: { username, id }
    })
  } catch (err) {
    // 对于token过期也应该执行一次clear操作
    next(new Error(err))
  }
})
复制代码
4. 注销环节
当用户主动退出某个子系统时，需要将该domain下的所有子系统都退出，由于之前将session相关的存入了redis中，所以在注销的时候需要将这些session全部清除，否则的话可能会导致子系统在一定时间内仍然可以获取资源的问题。这里我交给了clearClientStore(token)和deleteToken(token)这两个函数。

问题思考与总结
其实整个SSO流程走下来还是比较清晰的，但在做之前感觉相当棘手相当有难度（或许只是对我这个前端来说有难度），这期间也碰到了很多奇怪的问题，一方面是自己思路经常走歪的问题，另一方面则是自己不够熟练，摸石头过河。期间碰到问题以后也看了诸如express-session和connect-redis的部分源码实现才得以理解。

遇到的问题及解决
使用express-session的时候一直在用regenerate去重新生成session，一直纳闷自己的session玩什么没有生成，后来在某个大佬的指点下静下心来看了源码发现，有些事情中间件已经帮忙做好了，对于session的操作我只需要做最简单的set和get即可。
redis一直读取不到session的key值问题，这个问题在看了connect-redis的源码发现，它会默认给sid加一个一个prefix前缀，默认为'sess:'，所以从redis中获取sid的时候必须得get prefix + sid
深刻认识到有些时候苦苦不能解决一个问题的时候，那一定是之前的思路有问题，这时候必须得静下心来从问题的根源找起，对于程序员来说寻找问题的根源的最有效办法就是阅读源码了。

还在设计的过程中考虑如何减少子系统的接入成本（仅需要进行认证一步操作），安全性方面的考虑（httpOnly，RealIP过滤，session有效期等），性能方面的考虑（局部会话和redis）

最后附上完整的示例代码 恳请各位大佬给个Star吧，小弟在此跪谢了，代码里把config文件夹ignore了，里面只有一份数据库配置项和加盐参数而已。passport应该做一些调整即可直接使用。

还有诸多考虑不周的地方，希望各位大佬可以给予些许指点。