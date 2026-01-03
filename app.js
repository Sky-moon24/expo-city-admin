let lang = localStorage.getItem("lang") || "ar";

function setLang(l){
  lang = l;
  localStorage.setItem("lang", lang);
  applyLang();
}

function toggleLang(){
  setLang(lang === "ar" ? "en" : "ar");
}

function applyLang(){
  const html = document.documentElement;
  html.lang = lang;
  html.dir = (lang === "ar") ? "rtl" : "ltr";

  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");
  const topbar  = document.querySelector(".topbar");

  // RTL: سايدبار يمين | LTR: سايدبار يسار
  if(sidebar){
    sidebar.style.right = (lang==="ar") ? "0" : "auto";
    sidebar.style.left  = (lang==="en") ? "0" : "auto";
  }

  // مساحات المحتوى حسب مكان السايدبار
  const offset = 240;
  if(content){
    content.style.marginRight = (lang==="ar") ? offset+"px" : "0";
    content.style.marginLeft  = (lang==="en") ? offset+"px" : "0";
  }
  if(topbar){
    topbar.style.marginRight = (lang==="ar") ? offset+"px" : "0";
    topbar.style.marginLeft  = (lang==="en") ? offset+"px" : "0";
  }

  // ترجمة النصوص
  document.querySelectorAll("[data-ar]").forEach(el=>{
    el.textContent = (lang==="ar") ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });

  const lb = document.getElementById("langBtn");
  if(lb) lb.textContent = (lang==="ar") ? "EN" : "AR";
}

document.addEventListener("DOMContentLoaded", applyLang);
