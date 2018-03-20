<h3>一、前言</h3>

&nbsp;&nbsp;九月份开始，公司开始使用ionic3 angular4开发`建筑人`app 2.0版本，参与项目开发之余，在元旦前后终于有时间开始利用ionic尝试学习开发一个仿知乎项目。 方便自己的知识结构梳理和入门学习之用。

&nbsp;&nbsp;另一个原因是自己在工作之余，也在学习vue框架，希望通过一些小项目的开发，对于angular4和vue2有个更深入的对比。

[vue-music-project github地址传送门](https://github.com/jiaen188/vue-music-project)


<hr/><h3>二、技术栈</h3>

	ionic3 + angular4 + rxjs + typescript + cordova

&nbsp;&nbsp;angular4本身是一个重量级的框架，相比vue，核心库中就已经带有很丰富的http模块，表单模块等等，适用于大项目多人团队开发。同时由于入门门槛相对较高，需要比较多的前置知识，在国内的使用程度和受众不是很高。

[angular中文文档](https://angular.cn/docs)

[ionic官方文档](https://ionicframework.com/docs/)

[教程 | RxJs 中文文档](http://cn.rx.js.org)


<h3>三、环境搭建</h3>

```
npm install ionic cordova -g (可能需要翻墙)

git clone git@github.com:jiaen188/ionic3-zhihu-project.git

cd ionic3-zhihu-project

npm install 

ionic serve
```

如果想要打包成app请从官网中(https://ionicframework.com/getting-started)根据不同操作系统配置不同的环境

<hr><h3>四、目录结构</h3>

```
|——node_modules                                         //npm项目依赖

|——platform                                             //平台 （运行ionic cordova platform add android 会生成）           

|——plugins                                              //cordova插件文件 （同上运行命令后会生成）

|——plugins                                              //打包app需要的资源（包括启动图，图标等）

|——src	
    |——app                                            
|       |——app.component.ts
    |
|       |——app.html
    |
|       |——app.module.ts
    |
|       |——app.scss
    |
|       |——main.ts
    |
|	
    |——assets                                           //静态资源，包括图片、mock数据等
|       |——icon
    |
|       |——images
    |
|       |——mock
    |
|
    |——common——                                        //公共的加载组件
|
	|——components——                                    //公共组件 
|			  |——emojipicker                           //表情包组件
	|
|			  |——question-list                         //问题列表组件
	|		
|			  |——components.module.ts                     
	|
|
	|——pages——                                         //业务页面 
|			  |——answer                                //答案页面
	|
|			  |——chat                                  //聊天面板
	|		
|			  |——chatdetails                           //聊天详情页面
	|
|			  |——details                               //问题详情页面
	|
|			  |——discovery                             //发现面板
	|		
|			  |——headface                              //头像页面
	|
|			  |——home                                  //首页面板
	|
|			  |——login                                 //登录页面
	|		
|			  |——more                                  //更多面板
	|
|			  |——notification                          //通知面板
	|
|			  |——question                              //问题列表页面
	|		
|			  |——register                              //注册页面
	|
|			  |——scan                                  //扫描二维码页面
	|
|			  |——tabs                                  //tab页面
	|		
|			  |——user                                  //用户页面
	|
|			  |——userdetatalist                        //详情页面
	|
|			  |——versions                              //版本页面
    |
|
    |——pipes——                                         //管道文件
|		      |——relativetime                          //处理时间管道
	|
|		      |——pipes.modules.ts                                  
    |
|
    |——providers——
|		      |——chatservice                            //聊天服务模块
	|
|		      |——emoji                                  //表情包模块
    |
|		      |——rest                                   //接口模块
	|
|		      |——settings                               //设置主题模块
    |
|
    |——theme                                            //主题
|
    |——index.html                                       //首页
|

```


**github 上的 README.md 持续的会完善 ... ...**


### :point_right: This starter repo has moved to the [ionic-team/starters](https://github.com/ionic-team/starters/tree/master/ionic-angular/official/tabs) repo! :point_left:
