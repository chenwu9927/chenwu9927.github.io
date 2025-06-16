(()=>{let e,r,l=[];function t(){0!==(l=(()=>{let r=document.querySelector(".post-content");if(!r)return[];var e=r.querySelectorAll("h1, h2, h3, h4, h5, h6");let l=[];return e.forEach(e=>{let t=e.parentElement,n=!1;for(;t&&t!==r;){if("PRE"===t.tagName||"CODE"===t.tagName||t.classList.contains("highlight")||t.classList.contains("code")||t.classList.contains("gutter")){n=!0;break}t=t.parentElement}var o;n||(e.id||(o="heading-"+e.textContent.trim().replace(/[^\w\u4e00-\u9fa5]/g,"-").replace(/-+/g,"-").toLowerCase(),e.id=o),l.push({element:e,text:e.textContent.trim(),level:parseInt(e.tagName.charAt(1)),id:e.id}))}),l})()).length&&(r.innerHTML="",l.forEach((t,e)=>{var n=document.createElement("li"),o=document.createElement("a");o.href="#"+t.id,o.textContent=t.text,o.style.cssText=`
                display: block;
                padding: 4px 0;
                color: #666;
                text-decoration: none;
                padding-left: ${12*(t.level-1)}px;
                border-left: 2px solid transparent;
                transition: all 0.2s ease;
            `,o.addEventListener("click",function(e){e.preventDefault();e=document.getElementById(t.id);e&&e.scrollIntoView({behavior:"smooth"})}),o.addEventListener("mouseenter",function(){this.style.background="#555",this.style.color="#fff",this.style.borderRadius="4px",this.style.padding="6px 8px",this.style.borderLeftColor="transparent"}),o.addEventListener("mouseleave",function(){this.style.background="transparent",this.style.color="#666",this.style.borderRadius="0",this.style.padding="4px 0",this.style.borderLeftColor="transparent"}),n.appendChild(o),r.appendChild(n)}),e.style.display="none")}function n(){if(0!==l.length){var e,n=window.pageYOffset||document.documentElement.scrollTop;let t=null;for(let e=l.length-1;0<=e;e--){var o=l[e];if(o.element.getBoundingClientRect().top+n-100<=n){t=o;break}}r.querySelectorAll("a").forEach(e=>{e.style.color="#666",e.style.fontWeight="normal"}),t&&(e=r.querySelector(`a[href="#${t.id}"]`))&&(e.style.color="#333",e.style.fontWeight="bold")}}function o(){"dark"===document.documentElement.getAttribute("data-theme")?(e.style.background="rgba(26, 26, 26, 0.95)",e.style.borderColor="#404040",e.style.color="#e0e0e0",r.querySelectorAll("a").forEach(e=>{e.addEventListener("mouseenter",function(){this.style.background="#666",this.style.color="#fff"})})):(e.style.background="rgba(255, 255, 255, 0.95)",e.style.borderColor="#ddd",e.style.color="#333",r.querySelectorAll("a").forEach(e=>{e.addEventListener("mouseenter",function(){this.style.background="#555",this.style.color="#fff"})}))}function a(){document.querySelector(".post-content")&&((e=document.createElement("div")).id="toc-container",e.style.cssText=`
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            max-width: 250px;
            max-height: 60vh;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #ddd;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            font-size: 13px;
            line-height: 1.4;
            display: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 15px;
            overflow-y: auto;
        `,(r=document.createElement("ul")).style.cssText=`
            margin: 0;
            padding: 0;
            list-style: none;
        `,e.appendChild(r),document.body.appendChild(e),t(),window.addEventListener("scroll",n),new MutationObserver(o).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),o())}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a):a()})();