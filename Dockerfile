# 使用官方的基础镜像，这里以 Node.js 为例
FROM nginx:1.17.10

# 将 dist 目录复制到容器中的工作目录
COPY docs/.vuepress/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动应用
CMD ["nginx", "-g", "daemon off;"]
