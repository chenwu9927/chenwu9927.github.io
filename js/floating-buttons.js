(function() {
    'use strict';
    
    let floatingContainer;
    let snowButton;
let tocButton;
let topButton;
    let isSnowActive = true;
    let snowfallInstance = null;
    
    // 创建浮动按钮容器
    function createFloatingContainer() {
        floatingContainer = document.createElement('div');
        floatingContainer.id = 'floating-buttons-container';
        floatingContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 10000;
            transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(floatingContainer);
    }
    
    // 创建通用按钮样式
    function createButton(icon, title) {
        const button = document.createElement('button');
        button.innerHTML = icon;
        button.title = title;
        button.style.cssText = `
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        `;
        
        // 添加涟漪效果
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // 悬浮效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.background = 'rgba(85, 85, 85, 0.9)';
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.fill = '#f0f0f0';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                const svg = this.querySelector('svg');
                if (svg) {
                    svg.style.fill = '#333';
                }
            }
        });
        
        return button;
    }
    
    // 创建雪花按钮
    function createSnowButton() {
        const snowIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                <path d="M6.5 14.5C4.01 14.5 2 12.49 2 10s2.01-4.5 4.5-4.5c.58 0 1.14.12 1.65.33C9.26 3.24 11.47 2 14 2c3.31 0 6 2.69 6 6 0 .55-.08 1.08-.23 1.58.9.55 1.48 1.54 1.48 2.67 0 1.66-1.34 3-3 3H6.5z"/>
            </svg>
        `;
        
        snowButton = createButton(snowIcon, '下雪了...');
        
        snowButton.addEventListener('click', function() {
            isSnowActive = !isSnowActive;
            
            if (isSnowActive) {
                // 启动下雪效果
                this.style.background = 'rgba(85, 85, 85, 0.9)';
                this.classList.add('active');
                const svg = this.querySelector('svg');
                if (svg) {
                    svg.style.fill = '#f0f0f0';
                }
                
                // 启动雪花效果
                if (window.startSnowfall) {
                    window.startSnowfall();
                }
            } else {
                // 停止下雪效果
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                this.classList.remove('active');
                const svg = this.querySelector('svg');
                if (svg) {
                    svg.style.fill = '#333';
                }
                
                // 停止雪花效果并添加风吹清除动画
                if (window.stopSnowfallWithWind) {
                    window.stopSnowfallWithWind();
                } else if (window.stopSnowfall) {
                    window.stopSnowfall();
                }
            }
        });
        
        floatingContainer.appendChild(snowButton);
        
        // 默认启动下雪效果
        if (isSnowActive && window.startSnowfall) {
            window.startSnowfall();
            snowButton.style.background = 'rgba(85, 85, 85, 0.9)';
            const svg = snowButton.querySelector('svg');
            if (svg) {
                svg.style.fill = '#f0f0f0';
            }
        }
    }
    
    // 创建目录按钮
    function createTocButton() {
        const tocIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>
            </svg>
        `;
        
        tocButton = createButton(tocIcon, '📋 切换目录 - 显示/隐藏文章目录导航');
        
        tocButton.addEventListener('click', function() {
            const tocContainer = document.getElementById('toc-container');
            if (tocContainer) {
                const isVisible = tocContainer.style.display !== 'none';
                
                if (isVisible) {
                    tocContainer.style.display = 'none';
                    this.style.background = 'rgba(255, 255, 255, 0.9)';
                    this.classList.remove('active');
                    const svg = this.querySelector('svg');
                    if (svg) {
                        svg.style.fill = '#333';
                    }
                } else {
                    tocContainer.style.display = 'block';
                    this.style.background = 'rgba(85, 85, 85, 0.9)';
                    this.classList.add('active');
                    const svg = this.querySelector('svg');
                    if (svg) {
                        svg.style.fill = '#f0f0f0';
                    }
                }
            }
        });
        
        floatingContainer.appendChild(tocButton);
    }
    
    // 创建回到顶部按钮（带进度环）
    function createTopButton() {
        const topIcon = `
            <svg class="progress-ring" width="50" height="50" viewBox="0 0 50 50" style="position: absolute; top: 0; left: 0;">
                <circle cx="25" cy="25" r="22" fill="none" stroke="#666" stroke-width="2" 
                        stroke-linecap="round" stroke-dasharray="138.23" stroke-dashoffset="138.23"
                        transform="rotate(-90 25 25)" class="progress-circle"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="position: relative; z-index: 1;">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;
        topButton = createButton(topIcon, '🚀 回到顶部 - 快速返回页面顶部');
        
        topButton.addEventListener('click', function() {
            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        floatingContainer.appendChild(topButton);
    }
    
    // 深色模式适配
    function updateTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            if (!isSnowActive && snowButton) {
                snowButton.style.background = 'rgba(45, 45, 45, 0.9)';
                const svg = snowButton.querySelector('svg');
                if (svg) {
                    svg.style.fill = '#e0e0e0';
                }
            }
            
            if (tocButton) {
                const tocContainer = document.getElementById('toc-container');
                const isTocVisible = tocContainer && tocContainer.style.display !== 'none';
                
                if (!isTocVisible) {
                    tocButton.style.background = 'rgba(45, 45, 45, 0.9)';
                    const svg = tocButton.querySelector('svg');
                    if (svg) {
                        svg.style.fill = '#e0e0e0';
                    }
                }
            }
        } else {
            if (!isSnowActive && snowButton) {
                snowButton.style.background = 'rgba(255, 255, 255, 0.9)';
                const svg = snowButton.querySelector('svg');
                if (svg) {
                    svg.style.fill = '#333';
                }
            }
            
            if (tocButton) {
                const tocContainer = document.getElementById('toc-container');
                const isTocVisible = tocContainer && tocContainer.style.display !== 'none';
                
                if (!isTocVisible) {
                    tocButton.style.background = 'rgba(255, 255, 255, 0.9)';
                    const svg = tocButton.querySelector('svg');
                    if (svg) {
                        svg.style.fill = '#333';
                    }
                }
            }
        }
    }
    
    // 添加CSS动画
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-3px);
                }
            }
            
            #floating-buttons-container button {
                animation: float 3s ease-in-out infinite;
                width: 50px !important;
                height: 50px !important;
                border-radius: 50% !important;
            }
            
            #floating-buttons-container button:nth-child(1) {
                animation-delay: 0s;
            }
            
            #floating-buttons-container button:nth-child(2) {
                animation-delay: 0.5s;
            }
            
            #floating-buttons-container button:nth-child(3) {
                animation-delay: 1s;
            }
            
            .progress-circle {
                transition: stroke-dashoffset 0.1s ease;
            }
            
            .progress-ring {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 初始化
    function init() {
        addStyles();
        createFloatingContainer();
        createSnowButton();
        
        // 只在有文章内容的页面显示目录按钮
        if (document.querySelector('.post-content')) {
            createTocButton();
        }
        
        // 添加回到顶部按钮
        createTopButton();
        
        // 监听滚动事件，控制回到顶部按钮的显示和进度更新
        let isTopButtonVisible = false;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
            const shouldShow = scrollTop > 500;
            
            // 更新进度环
            const progressCircle = topButton.querySelector('.progress-circle');
            if (progressCircle) {
                const circumference = 2 * Math.PI * 22; // r=22
                const offset = circumference - (progress / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
            
            if (shouldShow && !isTopButtonVisible) {
                topButton.style.opacity = '1';
                topButton.style.transform = 'scale(1)';
                isTopButtonVisible = true;
            } else if (!shouldShow && isTopButtonVisible) {
                topButton.style.opacity = '0.7';
                topButton.style.transform = 'scale(0.9)';
                isTopButtonVisible = false;
            }
        });
        
        // 监听主题变化
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // 初始主题设置
        updateTheme();
    }
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();