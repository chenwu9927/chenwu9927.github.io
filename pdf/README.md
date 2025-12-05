# PDF 文件目录

本目录用于存放博客中嵌入的 PDF 文件。

## 使用方法

1. 将 PDF 文件放入此目录（可创建子目录）
2. 在文章中使用以下语法引用：

```markdown
{% localpdf filename.pdf %}
{% localpdf subfolder/filename.pdf %}
{% localpdf filename.pdf 800 %}  # 自定义高度
```

## 注意事项

- 建议使用英文和数字命名文件
- 避免空格和特殊字符
- 单个文件建议不超过 10MB
