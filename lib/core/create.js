// create自定义命令
const program = require('commander');
const {
  createProjectAction,
  addCpnAction,
  addPageAndRoute,
  addStoreAction
} = require('./actions.js');

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);
  program
    .command('addcpn <name>')
    .description('add vue component, 例如：okcli addcpn HelloWorld [-d src/components]')
    .action((name) => {
      addCpnAction(name, program.opts().dest || 'src/components'); // program.opts().dest拿到-d参数后的值
    });
  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如：okcli addpage HelloWorld [-d src/pages]')
    .action((page) => {
      addPageAndRoute(page, program.opts().dest ? `${program.opts().dest}/${page}` : `src/pages/${page}`); // program.opts().dest拿到-d参数后的值
    });
  program
    .command('addstore <store>')
    .description('addstore, 例如：okcli addstore HelloWorld [-d src/store/modules]')
    .action((store) => {
      addStoreAction(store, program.opts().dest ? `${program.opts().dest}/${store}` : `src/store/modules/${store}`); // program.opts().dest拿到-d参数后的值
    });
}

module.exports = createCommands;