/**
 * 副标题打字机效果
 * 参考thoughts页面的实现，为副标题添加打字机动画
 */

(function() {
    'use strict';
    
    let subtitleElement;
    let originalText;
    let isTyping = false;
    
    // 初始化副标题打字机效果
    function initSubtitleTypewriter() {
        subtitleElement = document.querySelector('.description');
        if (!subtitleElement) return;
        
        // 保存原始文本
        originalText = subtitleElement.textContent.trim();
        if (!originalText) return;
        
        // 清空内容并添加打字机样式
        subtitleElement.textContent = '';
        subtitleElement.classList.add('subtitle-typewriter');
        
        // 开始打字机效果
        startTypewriter(subtitleElement, originalText);
    }
    
    // 重播打字机效果（供外部调用）
    function replaySubtitleTypewriter() {
        if (!subtitleElement || !originalText || isTyping) return;
        
        // 重置状态
        subtitleElement.textContent = '';
        subtitleElement.classList.add('subtitle-typewriter');
        
        // 重新开始打字机效果
        startTypewriter(subtitleElement, originalText);
    }
    
    // 打字机效果函数
    function startTypewriter(element, text) {
        if (isTyping) return;
        isTyping = true;
        
        let currentIndex = 0;
        
        function typeNextChar() {
            if (currentIndex < text.length) {
                element.textContent = text.substring(0, currentIndex + 1);
                currentIndex++;
                
                // 根据字符类型调整打字速度
                const char = text.charAt(currentIndex - 1);
                const delay = /[\u4e00-\u9fa5]/.test(char) ? 150 : 100; // 中文慢一些
                
                setTimeout(typeNextChar, delay);
            } else {
                // 打字完成后移除光标效果
                setTimeout(() => {
                    element.classList.remove('subtitle-typewriter');
                    isTyping = false;
                }, 1000);
            }
        }
        
        // 延迟开始，让页面加载完成
        setTimeout(typeNextChar, 500);
    }
    
    // 添加CSS样式
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .subtitle-typewriter {
                position: relative;
            }
            
            .subtitle-typewriter::after {
                content: '|';
                display: inline-block;
                animation: blink 1s infinite;
                margin-left: 2px;
                color: #666;
            }
            
            @keyframes blink {
                0%, 50% {
                    opacity: 1;
                }
                51%, 100% {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 页面加载完成后初始化
    function init() {
        addStyles();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSubtitleTypewriter);
        } else {
            initSubtitleTypewriter();
        }
    }
    
    // 将重播函数暴露到全局
    window.replaySubtitleTypewriter = replaySubtitleTypewriter;
    
    init();
})();