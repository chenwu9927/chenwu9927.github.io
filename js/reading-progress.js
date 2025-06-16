(function() {
    'use strict';
    
    let progressBar;
    
    // 创建进度条元素
    function createProgressBar() {
        progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #404040;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    // 计算阅读进度
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    }
    
    // 初始化
    function init() {
        // 只在文章页面显示进度条
        if (document.querySelector('.post')) {
            createProgressBar();
            
            // 监听滚动事件
            window.addEventListener('scroll', updateProgress);
            window.addEventListener('resize', updateProgress);
            
            // 初始计算
            updateProgress();
        }
    }
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();