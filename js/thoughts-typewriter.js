/**
 * Thoughts页面简化打字机效果
 * 使用CSS动画实现流畅的打字机效果
 */

(function() {
    'use strict';
    
    // 检查是否为thoughts页面
    function isThoughtsPage() {
        return document.querySelector('.thoughts-container') !== null;
    }
    
    // 计算文本长度，考虑中文字符和多行文本
    function calculateTextLength(text) {
        // 对于中文字符，每个字符计算为1.5个单位，英文字符为1个单位
        let length = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            // 检查是否为中文字符
            if (/[\u4e00-\u9fa5]/.test(char)) {
                length += 1.5;
            } else {
                length += 1;
            }
        }
        return Math.ceil(length);
    }
    
    // 初始化thoughts页面的打字机效果
    function initThoughtsTypewriter() {
        const thoughtItems = document.querySelectorAll('.thought-item');
        
        thoughtItems.forEach((item, index) => {
            const contentElement = item.querySelector('.thought-content');
            if (!contentElement) return;
            
            // 保存原始文本
            const originalText = contentElement.textContent.trim();
            contentElement.setAttribute('data-original-text', originalText);
            
            let typewriterTimeout;
            let isTyping = false;
            
            // 鼠标悬停事件
            item.addEventListener('mouseenter', function() {
                if (isTyping) return;
                
                // 清空内容并开始打字机效果
                contentElement.textContent = '';
                contentElement.classList.add('typewriter-active');
                
                startTypewriter(contentElement, originalText);
            });
            
            // 鼠标离开事件
            item.addEventListener('mouseleave', function() {
                // 停止打字机效果
                if (typewriterTimeout) {
                    clearTimeout(typewriterTimeout);
                }
                isTyping = false;
                
                // 恢复原始文本
                contentElement.textContent = originalText;
                contentElement.classList.remove('typewriter-active');
            });
            
            // 打字机效果函数
            function startTypewriter(element, text) {
                isTyping = true;
                let currentIndex = 0;
                
                function typeNextChar() {
                    if (currentIndex < text.length && isTyping) {
                        element.textContent = text.substring(0, currentIndex + 1);
                        currentIndex++;
                        
                        // 根据字符类型调整打字速度
                        const char = text.charAt(currentIndex - 1);
                        const delay = /[\u4e00-\u9fa5]/.test(char) ? 120 : 80; // 中文慢一些
                        
                        typewriterTimeout = setTimeout(typeNextChar, delay);
                    } else {
                        isTyping = false;
                        // 打字完成后移除光标
                        setTimeout(() => {
                            if (element.classList.contains('typewriter-active')) {
                                element.classList.remove('typewriter-active');
                            }
                        }, 1000);
                    }
                }
                
                typeNextChar();
            }
        });
    }
    
    // 页面加载完成后初始化
    function init() {
        if (isThoughtsPage()) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initThoughtsTypewriter);
            } else {
                initThoughtsTypewriter();
            }
        }
    }
    
    // 初始化
    init();
    
})();