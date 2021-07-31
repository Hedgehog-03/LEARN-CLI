// 执行终端命令相关的代码
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args); // 创建子进程，并执行命令，返回一个ChildProcess类
    // 利用stdout(标准输出流)的管道通信，进行子进程和本进程的数据传输
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 监听子进程的关闭时间
    childProcess.on("close", () => {
      resolve();
    });
  });
};
module.exports = { 
  commandSpawn 
};
