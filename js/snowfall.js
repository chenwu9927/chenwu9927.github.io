(function() {
    'use strict';
    
    let snowflakes = [];
    let animationId;
    let accumulatedSnow = []; // 存储堆积的雪花信息
    let snowHeightMap = {}; // 记录每个x位置的雪花堆积高度
    
    // 雪花类
    class Snowflake {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = -10;
            this.size = Math.random() * 3 + 2; // 增大雪花大小范围
            this.speed = Math.random() * 1.5 + 0.5; // 减慢速度
            this.opacity = Math.random() * 0.7 + 0.3;
            this.drift = Math.random() * 1.5 - 0.75;
            this.initialOpacity = this.opacity;
            this.type = Math.random() < 0.7 ? 'snowflake' : 'light'; // 70%雪花，30%光球
            this.canCrossMidline = Math.random() < 0.3; // 30%的雪花可以越过中线
            this.fadeStartY = this.canCrossMidline ? window.innerHeight * 0.8 : Math.random() * (window.innerHeight * 0.3) + (window.innerHeight * 0.3);
            this.element = this.createElement();
        }
        
        createElement() {
            const element = document.createElement('div');
            if (this.type === 'light') {
                element.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 1000;
                    background: radial-gradient(circle, rgba(85, 85, 85, 0.8) 0%, rgba(85, 85, 85, 0.3) 50%, transparent 100%);
                    border-radius: 50%;
                    width: ${this.size * 3}px;
                    height: ${this.size * 3}px;
                    left: ${this.x}px;
                    top: ${this.y}px;
                    opacity: ${this.opacity};
                    filter: blur(1px);
                    transition: all 0.2s ease;
                `;
            } else {
                element.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 1000;
                    color: #555555;
                    user-select: none;
                    font-size: ${this.size * 3}px;
                    left: ${this.x}px;
                    top: ${this.y}px;
                    opacity: ${this.opacity};
                    filter: blur(0.3px) drop-shadow(0 0 2px rgba(85, 85, 85, 0.4));
                    transition: all 0.2s ease;
                `;
                element.innerHTML = '❄';
            }
            document.body.appendChild(element);
            return element;
        }
        
        update() {
            this.y += this.speed;
            this.x += this.drift;
            
            // 边界检查 - 超出边界的雪花直接销毁
            if (this.x > window.innerWidth + 10 || this.x < -10) {
                this.destroy();
                return false;
            }
            
            // 更新位置
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            
            // 检查是否碰到堆积的雪花或底部
            const xPos = Math.floor(this.x / 10) * 10;
            const currentStackHeight = snowHeightMap[xPos] || 0;
            
            if (this.y > window.innerHeight - 20 - currentStackHeight) {
                this.accumulate();
                return false;
            }
            
            return true;
        }
        
        accumulate() {
            if (this.element && this.element.parentNode) {
                // 计算当前x位置的堆积高度
                const xPos = Math.floor(this.x / 10) * 10; // 将x位置量化为10px的网格
                const currentHeight = snowHeightMap[xPos] || 0;
                
                // 设置雪花的最终位置
                this.element.style.position = 'fixed';
                this.element.style.bottom = currentHeight + 'px';
                this.element.style.left = this.x + 'px';
                this.element.style.opacity = '0.4';
                this.element.style.zIndex = '999';
                this.element.style.transition = 'all 0.3s ease';
                
                // 更新该位置的堆积高度
                snowHeightMap[xPos] = currentHeight + this.size * 2;
                
                // 记录堆积的雪花
                accumulatedSnow.push({
                    element: this.element,
                    x: xPos,
                    height: currentHeight
                });
                
                // 限制堆积高度，避免过高
                if (snowHeightMap[xPos] > window.innerHeight * 0.3) {
                    snowHeightMap[xPos] = window.innerHeight * 0.3;
                }
            }
        }
        
        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.style.opacity = '0';
                setTimeout(() => {
                    if (this.element && this.element.parentNode) {
                        this.element.parentNode.removeChild(this.element);
                    }
                }, 300);
            }
        }
        
        // 风吹效果
        blowAway() {
            if (this.element && this.element.parentNode) {
                this.element.style.transition = 'all 1.5s ease-out';
                this.element.style.transform = `translateX(${window.innerWidth + 100}px) rotate(360deg)`;
                this.element.style.opacity = '0';
                setTimeout(() => {
                    if (this.element && this.element.parentNode) {
                        this.element.parentNode.removeChild(this.element);
                    }
                }, 1500);
            }
        }
    }
    
    // 创建雪花
    function createSnowflake() {
        if (snowflakes.length < 40) { // 增加雪花数量
            snowflakes.push(new Snowflake());
        }
    }
    
    // 动画循环
    function animate() {
        // 更新所有雪花
        snowflakes = snowflakes.filter(snowflake => snowflake.update());
        
        // 随机创建新雪花
        if (Math.random() < 0.25) {
            createSnowflake();
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 清理所有雪花
    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        snowflakes.forEach(snowflake => snowflake.destroy());
        snowflakes = [];
        
        // 清理堆积的雪花
        accumulatedSnow.forEach(snow => {
            if (snow.element && snow.element.parentNode) {
                snow.element.parentNode.removeChild(snow.element);
            }
        });
        accumulatedSnow = [];
        snowHeightMap = {};
    }
    
    // 窗口大小改变时的处理
    function handleResize() {
        // 移除超出边界的雪花
        snowflakes = snowflakes.filter(snowflake => {
            if (snowflake.x > window.innerWidth + 10 || snowflake.x < -10) {
                snowflake.destroy();
                return false;
            }
            return true;
        });
    }
    
    // 启动雪花效果
    function startSnowfall() {
        if (animationId) return; // 如果已经在运行，不重复启动
        
        snowflakes = [];
        animate();
    }
    
    // 停止雪花效果
    function stopSnowfall() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        // 清除所有雪花
        snowflakes.forEach(snowflake => snowflake.destroy());
        snowflakes = [];
        
        // 清除堆积的雪花
        accumulatedSnow.forEach(snow => {
            if (snow.element && snow.element.parentNode) {
                snow.element.style.opacity = '0';
                setTimeout(() => {
                    if (snow.element && snow.element.parentNode) {
                        snow.element.parentNode.removeChild(snow.element);
                    }
                }, 300);
            }
        });
        accumulatedSnow = [];
        snowHeightMap = {};
    }
    
    // 带风吹效果的停止雪花
    function stopSnowfallWithWind() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        // 风吹清除所有雪花
        snowflakes.forEach(snowflake => snowflake.blowAway());
        snowflakes = [];
        
        // 清除所有堆积的雪花
        accumulatedSnow.forEach(snow => {
            if (snow.element && snow.element.parentNode) {
                snow.element.style.transition = 'all 1.5s ease-out';
                snow.element.style.transform = `translateX(${window.innerWidth + 100}px) rotate(360deg)`;
                snow.element.style.opacity = '0';
                setTimeout(() => {
                    if (snow.element && snow.element.parentNode) {
                        snow.element.parentNode.removeChild(snow.element);
                    }
                }, 1500);
            }
        });
        accumulatedSnow = [];
        snowHeightMap = {};
    }
    
    // 初始化（不自动启动）
    function init() {
        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);
        
        // 页面卸载时清理
        window.addEventListener('beforeunload', cleanup);
        
        // 将函数暴露到全局
        window.startSnowfall = startSnowfall;
        window.stopSnowfall = stopSnowfall;
        window.stopSnowfallWithWind = stopSnowfallWithWind;
    }
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();