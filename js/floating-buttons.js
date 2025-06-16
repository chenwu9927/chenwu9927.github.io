(()=>{let e,n,o,s,l=!0;function r(t,e){var n=document.createElement("button");return n.innerHTML=t,n.title=e,n.style.cssText=`
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
        `,n.addEventListener("mousedown",function(t){let e=document.createElement("span");var n=this.getBoundingClientRect(),o=Math.max(n.width,n.height),i=t.clientX-n.left-o/2,t=t.clientY-n.top-o/2;e.style.cssText=`
                position: absolute;
                width: ${o}px;
                height: ${o}px;
                left: ${i}px;
                top: ${t}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `,this.appendChild(e),setTimeout(()=>{e.remove()},600)}),n.addEventListener("mouseenter",function(){this.style.transform="translateY(-2px) scale(1.05)",this.style.background="rgba(85, 85, 85, 0.9)";var t=this.querySelector("svg");t&&(t.style.fill="#f0f0f0")}),n.addEventListener("mouseleave",function(){var t;this.style.transform="translateY(0) scale(1)",!this.classList.contains("active")&&(this.style.background="rgba(255, 255, 255, 0.9)",t=this.querySelector("svg"))&&(t.style.fill="#333")}),n}function a(){var t;"dark"===document.documentElement.getAttribute("data-theme")?(!l&&n&&(n.style.background="rgba(45, 45, 45, 0.9)",t=n.querySelector("svg"))&&(t.style.fill="#e0e0e0"),o&&!((t=document.getElementById("toc-container"))&&"none"!==t.style.display)&&(o.style.background="rgba(45, 45, 45, 0.9)",t=o.querySelector("svg"))&&(t.style.fill="#e0e0e0")):(!l&&n&&(n.style.background="rgba(255, 255, 255, 0.9)",t=n.querySelector("svg"))&&(t.style.fill="#333"),o&&!((t=document.getElementById("toc-container"))&&"none"!==t.style.display)&&(o.style.background="rgba(255, 255, 255, 0.9)",t=o.querySelector("svg"))&&(t.style.fill="#333"))}function t(){var t;(t=document.createElement("style")).textContent=`
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
        `,document.head.appendChild(t),(e=document.createElement("div")).id="floating-buttons-container",e.style.cssText=`
            position: fixed;
            top: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 10000;
            transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `,document.body.appendChild(e),(n=r(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                <path d="M6.5 14.5C4.01 14.5 2 12.49 2 10s2.01-4.5 4.5-4.5c.58 0 1.14.12 1.65.33C9.26 3.24 11.47 2 14 2c3.31 0 6 2.69 6 6 0 .55-.08 1.08-.23 1.58.9.55 1.48 1.54 1.48 2.67 0 1.66-1.34 3-3 3H6.5z"/>
            </svg>
        `,"下雪了...")).addEventListener("click",function(){var t;(l=!l)?(this.style.background="rgba(85, 85, 85, 0.9)",this.classList.add("active"),(t=this.querySelector("svg"))&&(t.style.fill="#f0f0f0"),window.startSnowfall&&window.startSnowfall()):(this.style.background="rgba(255, 255, 255, 0.9)",this.classList.remove("active"),(t=this.querySelector("svg"))&&(t.style.fill="#333"),window.stopSnowfallWithWind?window.stopSnowfallWithWind():window.stopSnowfall&&window.stopSnowfall())}),e.appendChild(n),l&&window.startSnowfall&&(window.startSnowfall(),n.style.background="rgba(85, 85, 85, 0.9)",t=n.querySelector("svg"))&&(t.style.fill="#f0f0f0"),document.querySelector(".post-content")&&((o=r(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>
            </svg>
        `,"📋 切换目录 - 显示/隐藏文章目录导航")).addEventListener("click",function(){var t,e=document.getElementById("toc-container");e&&("none"!==e.style.display?(e.style.display="none",this.style.background="rgba(255, 255, 255, 0.9)",this.classList.remove("active"),(t=this.querySelector("svg"))&&(t.style.fill="#333")):(e.style.display="block",this.style.background="rgba(85, 85, 85, 0.9)",this.classList.add("active"),(t=this.querySelector("svg"))&&(t.style.fill="#f0f0f0")))}),e.appendChild(o)),(s=r(`
            <svg class="progress-ring" width="50" height="50" viewBox="0 0 50 50" style="position: absolute; top: 0; left: 0;">
                <circle cx="25" cy="25" r="22" fill="none" stroke="#666" stroke-width="2" 
                        stroke-linecap="round" stroke-dasharray="138.23" stroke-dashoffset="138.23"
                        transform="rotate(-90 25 25)" class="progress-circle"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="position: relative; z-index: 1;">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `,"🚀 回到顶部 - 快速返回页面顶部")).addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),e.appendChild(s);let i=!1;window.addEventListener("scroll",function(){var t,e=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight-window.innerHeight,n=Math.min(e/n*100,100),e=500<e,o=s.querySelector(".progress-circle");o&&(t=2*Math.PI*22,o.style.strokeDashoffset=t-n/100*t),e&&!i?(s.style.opacity="1",s.style.transform="scale(1)",i=!0):!e&&i&&(s.style.opacity="0.7",s.style.transform="scale(0.9)",i=!1)}),new MutationObserver(a).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),a()}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()})();