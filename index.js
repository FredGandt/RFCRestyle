"use strict";const D=document,SE=D.scrollingElement,P=D.querySelector("pre");P.style.cssText="width:80ch;margin:0 auto 2em;";P.innerHTML="<p>"+P.textContent.split(/\n{2,}(?!\n\n)+/mg).join("</p><p>")+"</p>";const S=Array.from(D.querySelectorAll("p")),G=v=>{S.filter(e=>{let pos=e.offsetTop-SE.scrollTop;return !e.dataset.d&&pos>0&&pos<window.innerHeight}).forEach(e=>{e.innerHTML=e.textContent.replace(/(?:^| (RFC|BCP))(0*([0-9]+))/g,(m,a,b,c)=>(a?" ":"")+'<a href="https://tools.ietf.org/html/'+(a?a.toLowerCase():(/bcp-index/.test(location.pathname)?"bcp":"rfc"))+c+'" target="_blank">'+(a||"")+b+'</a>');e.dataset.d=!0})};G();window.addEventListener("scroll",G);
