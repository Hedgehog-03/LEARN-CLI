# 说明文档
---
|指令|描述|示例|
|:-|:-|:-|
|okcli -h --help|查看所有命令||
|okcli -v --version|查看版本号||
|okcli create <project>|创建一个项目并拉取模板|okcli create demo|
|okcli addcpn <name> [-d --dest <dest>]|用已有模块增加一个组件|okcli addcpn HelloWorld [-d src/components]|
|okcli addpage <page>> [-d --dest <dest>]|用已有模块增加一个页面，并配置其路由|okcli addpage HelloWorld [-d src/pages]|
|okcli addstore <store>> [-d --dest <dest>]|创建vuex子模块|okcli addstore HelloWorld [-d src/store/modules]|