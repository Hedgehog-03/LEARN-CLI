// help命令
const program = require('commander');
const helpOptions = () => {
  // 增加option
  // dest和framework可以通过program.opts().dest和program.opts().framework来拿到
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如：-d /src/components"
  );
  program.option("-f --framework <framework>", "your framework");

  program.on("--help", () => {
    console.log("");
    console.log("Other:");
    console.log("  other options~");
  });
};
module.exports = helpOptions;
