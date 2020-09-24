#!/user/local/bin/env node
const figlet = require("figlet"); //生成控制台标志性字符
const Printer = require("@darkobits/lolcatjs"); //字符加点颜色
const { program } = require("commander"); //接收用户命令
const version = require("../package.json").version; //读取版本号
const chalk = require("chalk"); //不同颜色显示错误信息
const shell = require("shelljs"); //在js里执行shell

const versionSir = figlet.textSync("YiDeng");
const transformed = Printer.default.fromString(
  ` \n 京城一灯项目脚手架${version} \n ${versionSir}`
);

program.version(transformed);
program
  .option("-c, crate", "创建一个组件")
  .option("-j, json2ts", "生成TypeScript");

const handlers = {
  json2ts(dataURL) {
    shell.exec(
      //使用quicktype生成TS
      `quicktype ${dataURL} -o ${
        //用户的生成路径
        shell.pwd().stdout
      }/Weather.ts --runtime-typecheck`
    );
  },
  /**
   *1.完成脚手架 webpack less typescript .... inquirer
   *2.根据用户的选择 下载github的项目 download-git-repo
   *3.对应的目录 利用shelljs yd-xxx ora
   *4.帮用户完善最终的操作 yarn intsall/npm install
   */
};

program.usage("[cmd] <options>") //接收用户命令 //命令+参数
  .arguments("<cmd> [env]")
  .action((cmd, otherParams) => {
    console.log(cmd, otherParams);
    const handler = handlers[cmd];
    if (typeof handler == "undefined") {
      //句柄不存在
      console.log(chalk.blue(`${cmd}`) + chalk.red("暂未支持"));
    } else {
      handlers[cmd](otherParams);
    }
  });

program.parse(process.argv);

console.log(transformed);
