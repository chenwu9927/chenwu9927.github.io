(()=>{let t;function e(){var e=(window.pageYOffset||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-window.innerHeight)*100;t&&(t.style.width=Math.min(e,100)+"%")}function n(){document.querySelector(".post")&&((t=document.createElement("div")).id="reading-progress",t.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #404040;
            z-index: 9999;
            transition: width 0.1s ease;
        `,document.body.appendChild(t),window.addEventListener("scroll",e),window.addEventListener("resize",e),e())}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()})();