# 解决 npm 权限不足问题，每次需要加 sudo 赋权限

```shell
sudo chown -R $(whoami) /path/to/your/project
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
vource ~/.bashrc
```
