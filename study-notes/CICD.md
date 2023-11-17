# CICD流程
## CI的流程

### root project 的 general settings

Default template已经默认从Root Project继承了一些属性

Build Configurations 构建的配置

Subprojects 创建子项目，例如bb的user和management

root project 的Parameters 可以继承给build的Parameters

Configuration Parameters docker的配置

### 里层Containerization Build的 general settings
￼![general settings](https://github.com/koki812/MyLearing/assets/139139520/b0915409-16fd-4dda-989c-5a8c2fdbb6fe)

Build包的7个步骤

1.  GitVersion 的 /output buildserver 这个命令会让 GitVersion 输出特定格式的版本号,适合在构建服务器(如 TeamCity)中使用
2.  Build 就是安装依赖包
3.  打包
4.  Docker 登录（可禁用，通过代理机代理登录，一般为![代理机](https://github.com/koki812/MyLearing/assets/139139520/f13370e3-f014-4143-99d4-b59070791925)）
5.  构建镜像
![构建镜像](https://github.com/koki812/MyLearing/assets/139139520/2d82fc48-3377-4885-ae2a-ce329a5ae64b)

有subProject的写法
￼![subProject](https://github.com/koki812/MyLearing/assets/139139520/54abb5f6-6d0b-4063-9532-b4b6049cb5e7)

6.  推送docker镜像到仓库
￼![推送docker镜像到仓库](https://github.com/koki812/MyLearing/assets/139139520/feffd799-8c53-41b5-8105-4d4239de1ab3)

7.  Docker构建完成后,删除本地构建的镜像
￼![删除本地构建的镜像](https://github.com/koki812/MyLearing/assets/139139520/2ba1aed0-ba2a-48f7-ae8e-39db5df5ad09)

里层的Parameters
Configuration Parameters 可继承root project的Parameters
Environment Variables (env.)环境变量
￼![Environment Variables](https://github.com/koki812/MyLearing/assets/139139520/0338e8d4-2261-418c-bbc4-1914a8564127)


## CD的流程

Process分为两步
1.Deploy web（部署k8s容器）
 ![集群](https://github.com/koki812/MyLearing/assets/139139520/6fdaefd9-e36c-477a-a3af-e39a7b3576e8)
 ![Volume](https://github.com/koki812/MyLearing/assets/139139520/7c32d39b-ed6d-4959-9666-26d92547aa7d)

￼
Variables对应
![Config Map](https://github.com/koki812/MyLearing/assets/139139520/48ef814a-b980-4713-8a78-0f293ee8e11d)

￼
Container：要和CI的build的位置做关联
![Container](https://github.com/koki812/MyLearing/assets/139139520/40556d39-e6a1-4417-961f-f407efd4016a)

￼
Container 的Volume Mounts 对应替换docker内build包的json内的字段
￼![Volume Mounts](https://github.com/koki812/MyLearing/assets/139139520/93500843-5d16-4375-ab75-dc07a5a4a12a)

Service Ports
￼![Service Ports](https://github.com/koki812/MyLearing/assets/139139520/a879978c-3df5-43a2-993e-f6e1953edf1c)


2.Deploy ingress（给k8s部署入口）
￼![Service Name](https://github.com/koki812/MyLearing/assets/139139520/f4bbf069-d52b-49c4-890c-8820bc127cf8)


Variables
￼![Variables tlsSecret](https://github.com/koki812/MyLearing/assets/139139520/4a8bd1ee-50b6-441e-87a4-2adbd1d5ae4f)
 ![Variables](https://github.com/koki812/MyLearing/assets/139139520/5c82ac90-b4b7-4d26-b6e8-80c0a745dac9)

￼
## dockerfile文件
￼![dockerfile文件解释](https://github.com/koki812/MyLearing/assets/139139520/662fbb3c-ccf5-41af-83ac-b627401ab348)

