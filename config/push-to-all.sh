#!/bin/bash

# 确保脚本在正确的目录下运行
if [ ! -d ".git" ]; then
  echo "请在 Git 仓库的根目录下运行此脚本。"
  exit 1
fi

# 获取当前分支名称
branch=$(git rev-parse --abbrev-ref HEAD)

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD; then
  echo "存在未提交的更改，请先提交更改。"
  exit 1
fi

# 推送到 GitHub
echo "正在推送到 GitHub..."
git push origin $branch

# 检查 GitHub 推送是否成功
if [ $? -ne 0 ]; then
  echo "推送至 GitHub 失败，请检查错误信息。"
  exit 1
fi

# 推送到 Gitee
echo "正在推送到 Gitee..."
git push gitee $branch

# 检查 Gitee 推送是否成功
if [ $? -ne 0 ]; then
  echo "推送至 Gitee 失败，请检查错误信息。"
  exit 1
fi

echo "代码已成功推送到 GitHub 和 Gitee。"