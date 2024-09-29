# 使用官方的基础镜像，这里以 Node.js 为例
FROM node:19-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 将 dist 目录复制到容器中的工作目录
COPY dist ./dist

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN pnpm install --only=production

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["npm", "start"]
