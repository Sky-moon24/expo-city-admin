// لغة افتراضية عربي
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

  // تبديل أماكن السايدبار/المحتوى حسب اللغة
  const content = document.querySelector(".content");
  const topbar = document.querySelector(".topbar");
  if(content) content.style.marginRight = (lang==="ar") ? "240px" : "0";
  if(content) content.style.marginLeft  = (lang==="en") ? "240px" : "0";
  if(topbar)  topbar.style.marginRight = (lang==="ar") ? "240px" : "0";
  if(topbar)  topbar.style.marginLeft  = (lang==="en") ? "240px" : "0";

  const sidebar = document.querySelector(".sidebar");
  if(sidebar){
    sidebar.style.right = (lang==="ar") ? "0" : "auto";
    sidebar.style.left  = (lang==="en") ? "0" : "auto";
  }

  // ترجمة العناصر اللي عليها data-ar / data-en
  document.querySelectorAll("[data-ar]").forEach(el=>{
    el.textContent = (lang==="ar") ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });

  // تحديث نص زر اللغة
  const lb = document.getElementById("langBtn");
  if(lb) lb.textContent = (lang==="ar") ? "EN" : "AR";
}

// تشغيل أول ما الصفحة تفتح
document.addEventListener("DOMContentLoaded", applyLang);
