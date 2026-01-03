let lang = localStorage.getItem("lang") || "ar";

function setLang(l){
  lang = l;
  localStorage.setItem("lang", lang);
  applyLang();
}

function toggleLang(){
  setLang(lang === "ar" ? "en" : "ar");
}

function isLoggedIn(){
  return localStorage.getItem("loggedIn") === "yes";
}

function requireAuth(){
  const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if(file === "index.html") return;

  if(!isLoggedIn()){
    window.location.href = "index.html";
  }
}

function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("demoUser");
  window.location.href = "index.html";
}

function applyLang(){
  const html = document.documentElement;
  html.lang = lang;
  html.dir = (lang === "ar") ? "rtl" : "ltr";

  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");
  const topbar  = document.querySelector(".topbar");
  const offset = 280;

  if(sidebar){
    sidebar.style.right = (lang==="ar") ? "0" : "auto";
    sidebar.style.left  = (lang==="en") ? "0" : "auto";
    sidebar.style.borderLeft = (lang==="en") ? "1px solid rgba(255,255,255,.08)" : "none";
    sidebar.style.borderRight = (lang==="ar") ? "1px solid rgba(255,255,255,.08)" : "none";
  }

  if(content){
    content.style.marginRight = (lang==="ar") ? offset+"px" : "0";
    content.style.marginLeft  = (lang==="en") ? offset+"px" : "0";
  }
  if(topbar){
    topbar.style.marginRight = (lang==="ar") ? offset+"px" : "0";
    topbar.style.marginLeft  = (lang==="en") ? offset+"px" : "0";
  }

  document.querySelectorAll("[data-ar]").forEach(el=>{
    el.textContent = (lang==="ar") ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });

  const lb = document.getElementById("langBtn");
  if(lb) lb.textContent = (lang === "ar") ? "EN" : "AR";

  const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === file) a.classList.add("active");
    else a.classList.remove("active");
  });

  const w = document.getElementById("welcomeName");
  if(w){
    const u = localStorage.getItem("demoUser") || "Admin";
    w.textContent = (lang==="en") ? `Welcome, ${u}` : `مرحبًا، ${u}`;
  }
}

function demoLogin(){
  const user = (document.getElementById("u")?.value || "").trim();
  const pass = (document.getElementById("p")?.value || "").trim();
  const msg  = document.getElementById("loginMsg");

  if(!user || !pass){
    if(msg){
      msg.style.color = "#ffb4b4";
      msg.textContent = (lang==="en") ? "Please enter username and password" : "اكتبي اسم المستخدم وكلمة المرور";
    }
    return;
  }

  localStorage.setItem("demoUser", user);
  localStorage.setItem("loggedIn", "yes");
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();
  applyLang();
});
