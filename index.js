import{a as L,S as w,i as p}from"./assets/vendor-DWaGEket.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function d(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=d(s);fetch(s.href,r)}})();L.defaults.baseURL="https://pixabay.com";const b=(e,t,d)=>{const a={params:{key:"45468562-3d934deccae668c7d7f46b2f1",q:e,page:t,per_page:d,image_type:"photo",orientation:"horizontal",safesearch:"true"}};return L.get("/api/",a).then(s=>s.data)};function P(e){return`
    <li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-img" />
        </a>
        <ul class="img-list">
        <li class="img-item">
            <h3 class="img-title">Likes</h3>
            <p class="img-text">${e.likes}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Views</h3>
            <p class="img-text">${e.views}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Comments</h3>
            <p class="img-text">${e.comments}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Downloads</h3>
            <p class="img-text">${e.downloads}</p>
        </li>
        </ul>
    </li>
    `}const u=document.querySelector(".search-form"),g=document.querySelector(".gallery"),i=document.querySelector(".loader"),o=document.querySelector(".load-more-btn");let l=1;const c=15;let n="";const C=new w(".gallery li a",{captions:!0,captionClass:"style-caption",captionsData:"alt",captionDelay:250,disableRightClick:!0});o.classList.add("is-hidden");const y=e=>e.classList.remove("is-hidden"),f=e=>e.classList.add("is-hidden"),h=(e,t="Error")=>{p.error({message:e,position:"topCenter",title:t,timeout:4e3})},S=()=>{g.innerHTML="",f(o)},q=async e=>{if(e.preventDefault(),i.classList.add("is-open"),l=1,n=u.elements.user_query.value.trim(),S(),!!n)try{y(i);const t=await b(n,l,c);if(t.hits.length===0){h("Sorry, there are no images matching your search query. Please try again!","Attention"),i.classList.remove("is-open");return}v(t.hits),i.classList.remove("is-open"),t.hits.length<c?p.info({message:"You've reached the end of search results.",position:"topCenter",title:"Info",timeout:4e3}):y(o)}catch(t){console.error(t),i.classList.remove("is-open"),h("An error occurred while fetching images. Please try again.")}finally{f(i),u.reset()}},E=async()=>{l+=1;try{i.classList.add("is-open");const e=await b(n,l,c);v(e.hits),i.classList.remove("is-open");const{height:t}=g.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),e.hits.length<c&&(p.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",title:"Info",timeout:4e3}),o.classList.add("is-hidden"))}catch(e){console.error(e),h("An error occurred while loading more images. Please try again.")}finally{f(i)}},v=e=>{const t=e.map(P).join("");g.insertAdjacentHTML("beforeend",t),C.refresh()};u.addEventListener("submit",q);o.addEventListener("click",E);
//# sourceMappingURL=index.js.map
