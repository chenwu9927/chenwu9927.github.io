(function() {
    'use strict';
    
    let tocContainer;
    let tocList;
    let headings = [];
    
    // 创建目录容器
    function createTocContainer() {
        tocContainer = document.createElement('div');
        tocContainer.id = 'toc-container';
        tocContainer.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            max-width: 250px;
            max-height: 60vh;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #ddd;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            font-size: 13px;
            line-height: 1.4;
            display: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 15px;
            overflow-y: auto;
        `;
        
        tocList = document.createElement('ul');
        tocList.style.cssText = `
            margin: 0;
            padding: 0;
            list-style: none;
        `;
        
        tocContainer.appendChild(tocList);
        document.body.appendChild(tocContainer);
    }
    
    // 获取文章中的标题（排除代码块中的内容）
    function getHeadings() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return [];
        
        const allHeadings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const validHeadings = [];
        
        allHeadings.forEach(heading => {
            // 检查标题是否在代码块内
            let parent = heading.parentElement;
            let isInCodeBlock = false;
            
            while (parent && parent !== postContent) {
                if (parent.tagName === 'PRE' || 
                    parent.tagName === 'CODE' || 
                    parent.classList.contains('highlight') ||
                    parent.classList.contains('code') ||
                    parent.classList.contains('gutter')) {
                    isInCodeBlock = true;
                    break;
                }
                parent = parent.parentElement;
            }
            
            // 只添加不在代码块中的标题
            if (!isInCodeBlock) {
                // 为标题添加ID（如果没有的话）
                if (!heading.id) {
                    const text = heading.textContent.trim();
                    const id = 'heading-' + text.replace(/[^\w\u4e00-\u9fa5]/g, '-').replace(/-+/g, '-').toLowerCase();
                    heading.id = id;
                }
                
                validHeadings.push({
                    element: heading,
                    text: heading.textContent.trim(),
                    level: parseInt(heading.tagName.charAt(1)),
                    id: heading.id
                });
            }
        });
        
        return validHeadings;
    }
    
    // 生成目录HTML
    function generateToc() {
        headings = getHeadings();
        
        if (headings.length === 0) {
            return;
        }
        
        tocList.innerHTML = '';
        
        headings.forEach((heading, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = '#' + heading.id;
            a.textContent = heading.text;
            a.style.cssText = `
                display: block;
                padding: 4px 0;
                color: #666;
                text-decoration: none;
                padding-left: ${(heading.level - 1) * 12}px;
                border-left: 2px solid transparent;
                transition: all 0.2s ease;
            `;
            
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            a.addEventListener('mouseenter', function() {
                this.style.background = '#555';
                this.style.color = '#fff';
                this.style.borderRadius = '4px';
                this.style.padding = '6px 8px';
                this.style.borderLeftColor = 'transparent';
            });
            
            a.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
                this.style.color = '#666';
                this.style.borderRadius = '0';
                this.style.padding = '4px 0';
                this.style.borderLeftColor = 'transparent';
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        // 默认隐藏目录，由浮动按钮控制
        tocContainer.style.display = 'none';
    }
    
    // 高亮当前阅读位置
    function highlightCurrentHeading() {
        if (headings.length === 0) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let currentHeading = null;
        
        // 找到当前最接近的标题
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            const rect = heading.element.getBoundingClientRect();
            const offsetTop = rect.top + scrollTop;
            
            if (scrollTop >= offsetTop - 100) {
                currentHeading = heading;
                break;
            }
        }
        
        // 更新高亮状态（移除蓝色标识）
        const links = tocList.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = '#666';
            link.style.fontWeight = 'normal';
        });
        
        if (currentHeading) {
            const currentLink = tocList.querySelector(`a[href="#${currentHeading.id}"]`);
            if (currentLink) {
                currentLink.style.color = '#333';
                currentLink.style.fontWeight = 'bold';
            }
        }
    }
    
    // 深色模式适配
    function updateTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            tocContainer.style.background = 'rgba(26, 26, 26, 0.95)';
            tocContainer.style.borderColor = '#404040';
            tocContainer.style.color = '#e0e0e0';
            
            // 更新链接的悬浮样式
            const links = tocList.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.background = '#666';
                    this.style.color = '#fff';
                });
            });
        } else {
            tocContainer.style.background = 'rgba(255, 255, 255, 0.95)';
            tocContainer.style.borderColor = '#ddd';
            tocContainer.style.color = '#333';
            
            // 更新链接的悬浮样式
            const links = tocList.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.background = '#555';
                    this.style.color = '#fff';
                });
            });
        }
    }
    
    // 初始化
    function init() {
        // 只在文章页面显示目录
        if (document.querySelector('.post-content')) {
            createTocContainer();
            generateToc();
            
            // 监听滚动事件
            window.addEventListener('scroll', highlightCurrentHeading);
            
            // 监听主题变化
            const observer = new MutationObserver(updateTheme);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
            
            // 初始主题设置
            updateTheme();
        }
    }
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();