(()=>{let e,t,r=!1;function n(){(e=document.querySelector(".description"))&&(t=e.textContent.trim())&&(e.innerHTML="",e.classList.add("subtitle-typewriter"),i(e,t))}function i(l,o){if(!r){r=!0;let i=0;l.innerHTML="",setTimeout(function e(){var t,n;i<o.length?(t=o.charAt(i),(n=document.createElement("span")).textContent=t,n.style.color="#00ffcc",l.appendChild(n),1<(n=l.querySelectorAll("span")).length&&(n[n.length-2].style.color=""),i++,n=/[\u4e00-\u9fa5]/.test(t)?150:100,setTimeout(e,n)):setTimeout(()=>{l.querySelectorAll("span").forEach(e=>{e.style.color=""}),l.classList.remove("subtitle-typewriter"),r=!1},1e3)},500)}}var l;window.replaySubtitleTypewriter=function(){e&&t&&!r&&(e.innerHTML="",e.classList.add("subtitle-typewriter"),i(e,t))},(l=document.createElement("style")).textContent=`
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
        `,document.head.appendChild(l),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()})();