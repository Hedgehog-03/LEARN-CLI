const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora');
const chalk = require('chalk');
const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils');

// create命令的action
// callback -> promisify函数 -> promise -> async await
const createProjectAction = async (project) => {
  // 判断是否已经存在项目
  if (!fs.existsSync(project)) {
    const spinner = ora('正在下载模板...');
    spinner.start();
    try {
      await download(vueRepo, project, { clone: true });
    } catch(err) {
      spinner.fail('下载模板失败，失败原因如下');
      console.log(chalk.red(err));
      return;
    }
    spinner.succeed('下载模板成功');
    // 2.执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'; // windows系统执行的是npm.cmd
    await commandSpawn(command, ['install'], {'cwd': `./${project}`})
    // 3.执行npm run serve
    await commandSpawn(command, ['run', 'serve'], {'cwd': `./${project}`})
    // 4.打开浏览器 
    // 不必写在cli里，npm run serve后会自动打开浏览器，是webpack的配置
    console.log(chalk.green('项目初始化完成'));
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(chalk.red('项目已存在'));
  }
}

// addcpn命令的action
const addCpnAction = async (name, dest) => {
  // 1.有对应的ejs模板
  // 2.编译ejs模板 result
  const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() });
  // 3.写入文件，先判断目录是否存在，不存在则创建目录
  if (createDirSync(dest)) {
    const targetPath = path.resolve(dest, `${name}.vue`);
    writeToFile(targetPath, result);
  }
}

// addpage命令的action
const addPageAndRoute = async (name, dest) => {
  // 1.有对应的ejs模板
  // 2.编译ejs模板 result
  const pageResult = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() });
  const routeResult = await compile("vue-router.ejs", { name, lowerName: name.toLowerCase() });
  // 3.写入文件，先判断目录是否存在，不存在则创建目录
  if (createDirSync(dest)) {
    const pageTargetPath = path.resolve(dest, `${name}.vue`);
    const routeTargetPath = path.resolve(dest, 'route.js');
    writeToFile(pageTargetPath, pageResult);
    writeToFile(routeTargetPath, routeResult);
  }
}

const addStoreAction = async (name, dest) => {
  // 1.有对应的ejs模板
  // 2.编译ejs模板 result
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});
  // 3.写入文件，先判断目录是否存在，不存在则创建目录
  if (createDirSync(dest)) {
    const storeTargetPath = path.resolve(dest, `${name}.js`);
    const typesTargetPath = path.resolve(dest, 'types.js');
    writeToFile(storeTargetPath, storeResult);
    writeToFile(typesTargetPath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAndRoute,
  addStoreAction
}