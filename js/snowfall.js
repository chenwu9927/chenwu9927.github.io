(()=>{let e=[],t,n=[],i={};class s{constructor(){this.x=Math.random()*window.innerWidth,this.y=-10,this.size=3*Math.random()+2,this.speed=1.5*Math.random()+.5,this.opacity=.7*Math.random()+.3,this.drift=1.5*Math.random()-.75,this.initialOpacity=this.opacity,this.type=Math.random()<.7?"snowflake":"light",this.canCrossMidline=Math.random()<.3,this.fadeStartY=this.canCrossMidline?.8*window.innerHeight:Math.random()*(.3*window.innerHeight)+.3*window.innerHeight,this.element=this.createElement()}createElement(){var e=document.createElement("div");return"light"===this.type?e.style.cssText=`
                    position: fixed;
                    pointer-events: none;
                    z-index: 1000;
                    background: radial-gradient(circle, rgba(85, 85, 85, 0.8) 0%, rgba(85, 85, 85, 0.3) 50%, transparent 100%);
                    border-radius: 50%;
                    width: ${3*this.size}px;
                    height: ${3*this.size}px;
                    left: ${this.x}px;
                    top: ${this.y}px;
                    opacity: ${this.opacity};
                    filter: blur(1px);
                    transition: all 0.2s ease;
                `:(e.style.cssText=`
                    position: fixed;
                    pointer-events: none;
                    z-index: 1000;
                    color: #555555;
                    user-select: none;
                    font-size: ${3*this.size}px;
                    left: ${this.x}px;
                    top: ${this.y}px;
                    opacity: ${this.opacity};
                    filter: blur(0.3px) drop-shadow(0 0 2px rgba(85, 85, 85, 0.4));
                    transition: all 0.2s ease;
                `,e.innerHTML="❄"),document.body.appendChild(e),e}update(){if(this.y+=this.speed,this.x+=this.drift,this.x>window.innerWidth+10||this.x<-10)return this.destroy(),!1;this.element.style.left=this.x+"px",this.element.style.top=this.y+"px";var e=10*Math.floor(this.x/10),e=i[e]||0;return!(this.y>window.innerHeight-20-e&&(this.accumulate(),1))}accumulate(){var e,t;this.element&&this.element.parentNode&&(e=10*Math.floor(this.x/10),t=i[e]||0,this.element.style.position="fixed",this.element.style.bottom=t+"px",this.element.style.left=this.x+"px",this.element.style.opacity="0.4",this.element.style.zIndex="999",this.element.style.transition="all 0.3s ease",i[e]=t+2*this.size,n.push({element:this.element,x:e,height:t}),i[e]>.3*window.innerHeight)&&(i[e]=.3*window.innerHeight)}destroy(){this.element&&this.element.parentNode&&(this.element.style.opacity="0",setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},300))}blowAway(){this.element&&this.element.parentNode&&(this.element.style.transition="all 1.5s ease-out",this.element.style.transform=`translateX(${window.innerWidth+100}px) rotate(360deg)`,this.element.style.opacity="0",setTimeout(()=>{this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},1500))}}function o(){e=e.filter(e=>e.update()),Math.random()<.25&&e.length<40&&e.push(new s),t=requestAnimationFrame(o)}function a(){t&&cancelAnimationFrame(t),e.forEach(e=>e.destroy()),e=[],n.forEach(e=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)}),n=[],i={}}function l(){e=e.filter(e=>!(e.x>window.innerWidth+10||e.x<-10)||(e.destroy(),!1))}function r(){t||(e=[],o())}function h(){t&&(cancelAnimationFrame(t),t=null),e.forEach(e=>e.destroy()),e=[],n.forEach(e=>{e.element&&e.element.parentNode&&(e.element.style.opacity="0",setTimeout(()=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)},300))}),n=[],i={}}function d(){t&&(cancelAnimationFrame(t),t=null),e.forEach(e=>e.blowAway()),e=[],n.forEach(e=>{e.element&&e.element.parentNode&&(e.element.style.transition="all 1.5s ease-out",e.element.style.transform=`translateX(${window.innerWidth+100}px) rotate(360deg)`,e.element.style.opacity="0",setTimeout(()=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)},1500))}),n=[],i={}}function m(){window.addEventListener("resize",l),window.addEventListener("beforeunload",a),window.startSnowfall=r,window.stopSnowfall=h,window.stopSnowfallWithWind=d}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",m):m()})();