(function() {
    'use strict';
    
    var header = document.getElementById('header');
    var headerHeight = header.offsetHeight;
    var isSticky = false;
    var lastScrollTop = 0;
    var scrollDirection = 'none';
    var scrollStartPosition = 0;
    var isAnimating = false; // 防止动画冲突
    
    // 平滑显示悬浮导航栏
    function showStickyHeader() {
        if (isSticky || isAnimating) return;
        
        isAnimating = true;
        header.style.transform = 'translateY(-100%)';
        header.classList.add('sticky');
        
        // 使用requestAnimationFrame确保平滑动画
        requestAnimationFrame(function() {
            header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            header.style.transform = 'translateY(0)';
            
            const floatingContainer = document.getElementById('floating-buttons-container');
            if (floatingContainer) {
                floatingContainer.style.transition = 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                floatingContainer.style.top = '80px';
            }
            
            setTimeout(function() {
                isAnimating = false;
                isSticky = true;
            }, 400);
        });
    }
    
    // 平滑隐藏悬浮导航栏
    function hideStickyHeader() {
        if (!isSticky || isAnimating) return;
        
        isAnimating = true;
        header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        header.style.transform = 'translateY(-100%)';
        
        const floatingContainer = document.getElementById('floating-buttons-container');
        if (floatingContainer) {
            floatingContainer.style.transition = 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            floatingContainer.style.top = '20px';
        }
        
        setTimeout(function() {
            header.classList.remove('sticky');
            header.style.transform = '';
            header.style.transition = '';
            isAnimating = false;
            isSticky = false;
        }, 300);
    }
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 当滚动距离超过导航栏高度时才考虑显示/隐藏悬浮导航栏
        const triggerPoint = headerHeight;
        
        if (scrollTop > triggerPoint) {
            // 检测滚动方向变化
            const currentDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            
            // 如果滚动方向改变，重置状态
            if (currentDirection !== scrollDirection) {
                scrollDirection = currentDirection;
                scrollStartPosition = scrollTop;
            }
            
            const scrollDistance = Math.abs(scrollTop - scrollStartPosition);
            const minScrollDistance = 50; // 最小滚动距离阈值
            
            if (scrollDirection === 'down') {
                // 下滑逻辑：显示悬浮导航栏
                if (scrollDistance > minScrollDistance && !isSticky) {
                    showStickyHeader();
                }
            } else if (scrollDirection === 'up') {
                // 上滑逻辑：显示悬浮导航栏
                if (scrollDistance > minScrollDistance && !isSticky) {
                    showStickyHeader();
                }
            }
        } else if (scrollTop <= triggerPoint) {
            // 滚动到顶部附近时，如果悬浮导航栏正在显示，则隐藏它
            // 让静态导航栏和动态导航栏保持独立，避免变化造成卡顿
            if (isSticky) {
                hideStickyHeader();
            }
            scrollDirection = 'none';
        }
        
        // 更新上次滚动位置
        lastScrollTop = scrollTop;
    }
    
    // 节流函数，优化性能
    var throttleTimer = null;
    function throttledScroll() {
        if (throttleTimer) {
            return;
        }
        
        throttleTimer = setTimeout(function() {
            handleScroll();
            throttleTimer = null;
        }, 10);
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', throttledScroll);
    
    // 监听窗口大小变化，重新计算header高度
    window.addEventListener('resize', function() {
        if (!isSticky) {
            headerHeight = header.offsetHeight;
        }
    });
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        headerHeight = header.offsetHeight;
    });
})();