(function() {
    'use strict';
    
    // 配置参数
    const config = {
        maxTrails: 15,           // 最大轨迹点数
        trailLife: 60,           // 轨迹生命周期（帧数）
        lineWidth: 2,            // 线条宽度
        colors: [
            'rgba(74, 144, 226, 0.8)',
            'rgba(80, 227, 194, 0.8)',
            'rgba(245, 166, 35, 0.8)',
            'rgba(208, 2, 27, 0.8)',
            'rgba(126, 87, 194, 0.8)'
        ],
        geometricShapes: true,   // 是否启用几何形状
        animationSpeed: 0.02     // 动画速度
    };
    
    let canvas, ctx;
    let mouseX = 0, mouseY = 0;
    let trails = [];
    let animationId;
    let time = 0;
    
    // 轨迹点类
    class TrailPoint {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.life = config.trailLife;
            this.maxLife = config.trailLife;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
            this.size = Math.random() * 3 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.life--;
            
            // 添加微妙的几何运动
            if (config.geometricShapes) {
                this.x += Math.cos(this.angle + time * this.speed) * 0.5;
                this.y += Math.sin(this.angle + time * this.speed) * 0.5;
                this.angle += 0.01;
            }
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            const currentColor = this.color.replace(/[\d\.]+\)$/g, `${alpha})`);
            
            ctx.fillStyle = currentColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
            ctx.fill();
        }
        
        isDead() {
            return this.life <= 0;
        }
    }
    
    // 初始化画布
    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        
        document.body.appendChild(canvas);
        
        ctx = canvas.getContext('2d');
        resizeCanvas();
    }
    
    // 调整画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 鼠标移动事件
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 添加新的轨迹点
        if (trails.length < config.maxTrails) {
            trails.push(new TrailPoint(mouseX, mouseY));
        }
    }
    
    // 绘制连接线
    function drawConnections() {
        if (trails.length < 2) return;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < trails.length - 1; i++) {
            const current = trails[i];
            const next = trails[i + 1];
            
            const distance = Math.sqrt(
                Math.pow(next.x - current.x, 2) + 
                Math.pow(next.y - current.y, 2)
            );
            
            // 只连接距离较近的点
            if (distance < 100) {
                const alpha = Math.min(current.life, next.life) / config.trailLife * 0.3;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                
                ctx.beginPath();
                ctx.moveTo(current.x, current.y);
                
                // 添加贝塞尔曲线使线条更优美
                const controlX = (current.x + next.x) / 2 + Math.sin(time * 0.01 + i) * 10;
                const controlY = (current.y + next.y) / 2 + Math.cos(time * 0.01 + i) * 10;
                
                ctx.quadraticCurveTo(controlX, controlY, next.x, next.y);
                ctx.stroke();
            }
        }
    }
    
    // 绘制几何图案
    function drawGeometricPatterns() {
        if (trails.length < 3) return;
        
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
        ctx.lineWidth = 0.5;
        
        // 绘制三角形连接
        for (let i = 0; i < trails.length - 2; i += 3) {
            const p1 = trails[i];
            const p2 = trails[i + 1];
            const p3 = trails[i + 2];
            
            if (p1 && p2 && p3) {
                const alpha = Math.min(p1.life, p2.life, p3.life) / config.trailLife * 0.2;
                ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
                
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time += config.animationSpeed;
        
        // 更新和绘制轨迹点
        trails = trails.filter(trail => {
            trail.update();
            trail.draw();
            return !trail.isDead();
        });
        
        // 绘制连接效果
        drawConnections();
        drawGeometricPatterns();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 初始化
    function init() {
        initCanvas();
        
        // 事件监听
        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);
        
        // 开始动画
        animate();
    }
    
    // 清理函数
    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resizeCanvas);
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', cleanup);
    
})();