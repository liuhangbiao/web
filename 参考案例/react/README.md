# 快速开始

* 安装、创建、启动
```
# Install
$ npm install dva-cli -g

# Create app
$ dva new myapp

# Start app
$ cd myapp
$ npm start
```

# 命令行

* 三个重要命令：`new`, `init` and `generate`(alias `g`).

* dva new [options] 新建目录并初始化
```
$ dva new myapp
$ dva new myapp --demo  //生成一个简单的快速原型项目
$ dva new myapp --no-install  //创建文件后禁用npm安装
```


* dva init [options] 初始化已有的目


* dva generate (short-cut alias: "g")  生成路由、模型和组件
```
$ dva g route product-list  
$ dva g model products
$ dva g component Editor
$ dva g component Users/UserModal
$ dva g component Header --no-css
```

注意：dva-cli使用roadhog建立和服务器，查看[roadhog＃配置](https://github.com/sorrycc/roadhog/blob/master/README_en-us.md#configuration)（[中文版](https://github.com/sorrycc/roadhog#%E9%85%8D%E7%BD%AE)）的详细信息。