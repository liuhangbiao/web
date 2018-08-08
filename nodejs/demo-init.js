#!/usr/bin/env node

const shell = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const spinner = ora();

program.parse(process.argv);

let dir = program.args[0];

const questions = [{
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: 'demo-static',
    validate: (name)=>{
        if(/^[a-z]+/.test(name)){
            return true;
        }else{
            return '项目名称必须以小写字母开头';
        }
    }
}]

inquirer.prompt(questions).then((answers)=>{
    // 初始化模板文件
    downloadTemplate(answers);
})

function downloadTemplate(params){
    spinner.start('loading');
    let isHasDir = fs.existsSync(path.resolve(dir));
    if(isHasDir){
        spinner.fail('当前目录已存在!');
        return false;
    }
    // 开始下载模板文件
    download('gitlab:git.gitlab.com/demo-static', dir, {clone: true}, function(err){
        if(err){
            spinner.fail(err);
        };
        updateTemplateFile(params);
    })
}

function updateTemplateFile(params){
    let { name, description } = params;
    fs.readFile(`${path.resolve(dir)}/public/package.json`, (err, buffer)=>{
        if(err) {
            console.log(chalk.red(err));
            return false;
        }
        shell.rm('-f', `${path.resolve(dir)}/.git`);
        shell.rm('-f', `${path.resolve(dir)}/public/CHANGELOG.md`);
        let packageJson = JSON.parse(buffer);
        Object.assign(packageJson, params);
        fs.writeFileSync(`${path.resolve(dir)}/public/package.json`, JSON.stringify(packageJson, null, 2));
        fs.writeFileSync(`${path.resolve(dir)}/README.md`, `# ${name}\n> ${description}`);
        spinner.succeed('创建完毕');
    });
}


作者：时间小鱼
链接：https://juejin.im/post/5b581795e51d453509561b34
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。