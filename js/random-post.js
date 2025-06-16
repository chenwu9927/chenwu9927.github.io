(()=>{let t,n=!1,o=[];function r(){let t=[];return document.querySelectorAll("article h1 a, .post-title a, .archive-post-title a, .post-list-link").forEach(e=>{e.href&&!t.includes(e.href)&&t.push(e.href)}),document.querySelectorAll(".archive-post a").forEach(e=>{e.href&&!t.includes(e.href)&&t.push(e.href)}),0===t.length&&["/2025/03/25/1558/","/2025/03/25/1556/","/2025/03/24/2121/","/2025/03/24/1954/","/2024/07/29/0021/","/2024/07/08/2317/","/2024/06/25/2338/","/2024/02/07/2150/","/2023/12/31/2342/","/2023/11/12/1620/"].forEach(e=>{e=window.location.origin+e;t.includes(e)||t.push(e)}),t}function l(){50<=(window.pageYOffset||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-window.innerHeight)*100?n||(t.style.opacity="1",t.style.transform="scale(1)",t.style.pointerEvents="auto",n=!0):n&&(t.style.opacity="0",t.style.transform="scale(0.8)",t.style.pointerEvents="none",n=!1)}function s(){var e;"dark"===document.documentElement.getAttribute("data-theme")&&t?(t.style.background="rgba(45, 45, 45, 0.9)",t.style.color="#f0f0f0",(e=t.querySelector("svg"))&&(e.style.fill="#f0f0f0")):t&&(t.style.background="rgba(255, 255, 255, 0.9)",t.style.color="#333",e=t.querySelector("svg"))&&(e.style.fill="#333")}function e(){var e;document.querySelector(".post-content")&&((e=document.createElement("style")).textContent=`
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            #random-post-button {
                box-shadow: none !important;
            }
            
            #random-post-button:hover {
                box-shadow: none !important;
            }
        `,document.head.appendChild(e),e=document.getElementById("floating-buttons-container"))&&(t=((t=document.createElement("button")).innerHTML=`
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#333">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2V7h-2v10zm3-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
        `,t.title="进入任意门...",t.id="random-post-button",t.style.cssText=`
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
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
            box-shadow: none;
        `,t.addEventListener("mousedown",function(e){let t=document.createElement("span");var n=this.getBoundingClientRect(),o=Math.max(n.width,n.height),r=e.clientX-n.left-o/2,e=e.clientY-n.top-o/2;t.style.cssText=`
                position: absolute;
                width: ${o}px;
                height: ${o}px;
                left: ${r}px;
                top: ${e}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `,this.appendChild(t),setTimeout(()=>{t.remove()},600)}),t.addEventListener("mouseenter",function(){var e;this.style.transform=n?"translateY(-2px) scale(1.05)":"scale(0.8)",n&&(this.style.background="rgba(85, 85, 85, 0.9)",e=this.querySelector("svg"))&&(e.style.fill="#f0f0f0")}),t.addEventListener("mouseleave",function(){var e;this.style.transform=n?"translateY(0) scale(1)":"scale(0.8)",n&&(this.style.background="rgba(255, 255, 255, 0.9)",e=this.querySelector("svg"))&&(e.style.fill="#333")}),t.addEventListener("click",function(){if(0<(o=0===o.length?r():o).length){let t=window.location.href;var n=o.filter(e=>e!==t);if(0<n.length){let e=n[Math.floor(Math.random()*n.length)];this.style.transform="scale(0.9)",this.style.opacity="0.7",setTimeout(()=>{window.location.href=e},200)}else console.log("没有其他文章可以跳转")}else console.log("未找到文章列表")}),t),e.appendChild(t),o=r(),window.addEventListener("scroll",l),new MutationObserver(s).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),s())}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()})();