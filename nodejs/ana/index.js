'use strict'
const fs = require('fs');
const path = require('path');
const structure = require('./data').items;
// dos 窗口输入--->ana init blog ,init属于 第二个参数
let args = process.argv.slice(2);
let cmd =args[0];
switch (cmd) {
    case 'init':
        let projectName = args[1];
        var rootName = `./${projectName}`;   //首次操作，假设此文件目录不存在
        fs.mkdir(rootName,(err)=>{      //创建目录
            if(err){
                throw  err;
            }
            structure.forEach((item)=>{  //遍历创建相应类型的文件 or 目录
                let type = item.type;
                if(type === 'dir'){
                    fs.mkdir(`${rootName}/${item.name}`,(err) =>{
                        if(err){
                            throw err;
                        }
                    })
                    console.log(`${rootName}/${item.name}`);
                }else if (type === 'file') {
                    fs.writeFile(`${rootName}/${item.name}`,item.content,(err) =>{
                        if(err){
                            console.log('failed')
                            throw err;
                        }
                    })
                    console.log(`${rootName}/${item.name}`);
                }
            })
        })
        break;
    case 'help':
        // TODO 
        console.log('help')
        break;
    case '--version':
        // TODO 
        console.log('--version')
        break;
    case'-v':
        // TODO 
        console.log('-v')
        break;
    default:
        console.log('Wrong support')
        break;
    }