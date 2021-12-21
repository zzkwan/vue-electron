/*
 * @Author: 卓智锴
 * @Date: 2021-12-15 10:55:20
 * @LastEditTime: 2021-12-21 15:01:58
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\vue.config.js
 * 衣带渐宽终不悔，bug寻得人憔悴
 */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.test.app",
        productName: "Lang", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2021", //版权信息
        directories: {
          output: "./dist" //输出文件路径
        },
        win: {
          //win相关配置
          icon: "./build/icons/icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序,打包文件的后缀为exe
              arch: [
                "x64", //64位
                "ia32" //32位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, //一键安装
          language: "2052", //安装语言
          perMachine: true, //应用所有用户
          allowToChangeInstallationDirectory: true //用户可以选择路径
        }
      },
      nodeIntegration: true
    }
  }
};

