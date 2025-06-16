(()=>{let e,l,a=!1;function t(){(e=document.querySelector(".description"))&&(l=e.textContent.trim())&&(e.innerHTML=l,e.addEventListener("mouseenter",function(){a||(e.innerHTML="",e.classList.add("subtitle-typewriter"),n(e,l))}),e.addEventListener("mouseleave",function(){}))}function n(r,o){if(!a){a=!0;let i=0;r.innerHTML="",setTimeout(function e(){var t,n;i<o.length?(t=o.charAt(i),(n=document.createElement("span")).textContent=t,n.style.color="#00ffcc",r.appendChild(n),1<(n=r.querySelectorAll("span")).length&&(n[n.length-2].style.color=""),i++,n=/[\u4e00-\u9fa5]/.test(t)?150:100,setTimeout(e,n)):setTimeout(()=>{r.innerHTML=l,r.classList.remove("subtitle-typewriter"),a=!1},1e3)},500)}}var i;window.replaySubtitleTypewriter=function(){e&&l&&!a&&(e.innerHTML="",e.classList.add("subtitle-typewriter"),n(e,l))},(i=document.createElement("style")).textContent=`
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
        `,document.head.appendChild(i),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()})();