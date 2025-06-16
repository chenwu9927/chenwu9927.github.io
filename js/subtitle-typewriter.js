(()=>{let t,e,r=!1;function i(){(t=document.querySelector(".description"))&&(e=t.textContent.trim())&&(t.textContent="",t.classList.add("subtitle-typewriter"),n(t,e))}function n(n,o){if(!r){r=!0;let i=0;setTimeout(function t(){var e;i<o.length?(n.textContent=o.substring(0,i+1),i++,e=o.charAt(i-1),e=/[\u4e00-\u9fa5]/.test(e)?150:100,setTimeout(t,e)):setTimeout(()=>{n.classList.remove("subtitle-typewriter"),r=!1},1e3)},500)}}var o;window.replaySubtitleTypewriter=function(){t&&e&&!r&&(t.textContent="",t.classList.add("subtitle-typewriter"),n(t,e))},(o=document.createElement("style")).textContent=`
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
        `,document.head.appendChild(o),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",i):i()})();