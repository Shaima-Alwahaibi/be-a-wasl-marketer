const I18N = {
  en: {
    dir: "ltr",
    lang: "en",
    kicker: "Join the team",
    title: "Be a WASL marketer",
    intro:
      "WASL is a simple system for companies. You can help introduce companies to our platform. For every company that joins WASL through you, you get a commission.",
    pill1: "Commission per company",
    pill2: "Join our market team",
    pill3: "One-page application",
    formTitle: "Apply to join",
    formLead: "Tell us a little about yourself. You get a commission for every company that joins WASL through you.",
    name: "Full name",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    phone: "Phone",
    email: "Email",
    likesPeople: "Do you like talking with people and meeting new companies?",
    whySuitable: "Why do you think you are suitable for this opportunity?",
    whySuitablePh: "What makes you a good fit for WASL",
    helpReach: "How can you help WASL reach new companies?",
    helpReachPh: "How you will introduce WASL to companies",
    expect: "What do you expect from us?",
    expectPh: "Support, training, commission, tools...",
    before: "Have you done marketing before?",
    yes: "Yes",
    no: "No",
    forWhat: "For what did you market?",
    forWhatPh: "Product, company, or service",
    result: "How was the result?",
    resultPh: "What happened, and what did you achieve?",
    cv: "CV",
    cvHint: "PDF, Word. Max 8 MB.",
    cvPick: "Click to attach your CV",
    cvPicked: "Selected",
    submit: "Send application",
    sending: "Sending...",
    ok: "Thank you. Your full application was sent. We will contact you.",
    err: "Could not send. Please try again.",
    needEmail: "Put your email in config.js first (inbox), then try again.",
    required: "Please fill the required fields.",
    fileBig: "The CV must be 8 MB or smaller.",
    successTitle: "Application sent",
    successText: "We received your form and CV. WASL will review it.",
    footer: "WASL — Join the marketing team",
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    kicker: "انضم إلى الفريق",
    title: "كن مسوّق وصل",
    intro:
      "وصل نظام بسيط للشركات. يمكنك المساعدة في تعريف الشركات بمنصتنا، وإذا انضمت شركة عن طريقك، تحصل على عمولة.",
    pill1: "عمولة عن كل شركة",
    pill2: "انضم لفريق السوق",
    pill3: "طلب في صفحة واحدة",
    formTitle: "قدّم للانضمام",
    formLead: "أخبرنا عنك باختصار. ستحصل على عمولة عن كل شركة تنضم إلى وصل عن طريقك.",
    name: "الاسم الكامل",
    age: "العمر",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    likesPeople: "هل تحب التواصل مع الناس والتعرف على شركات جديدة؟",
    whySuitable: "لماذا تعتقد أنك مناسب لهذه الفرصة؟",
    whySuitablePh: "ما الذي يجعلك مناسباً لوصل",
    helpReach: "كيف يمكنك مساعدة وصل في الوصول إلى شركات جديدة؟",
    helpReachPh: "كيف ستعرّف الشركات على وصل",
    expect: "ماذا تتوقع منا؟",
    expectPh: "دعم، تدريب، عمولة، أدوات...",
    before: "هل سبق أن عملت في التسويق؟",
    yes: "نعم",
    no: "لا",
    forWhat: "سوّقت لأي شيء؟",
    forWhatPh: "منتج أو شركة أو خدمة",
    result: "كيف كانت النتيجة؟",
    resultPh: "ماذا حصل، وما الذي حققته؟",
    cv: "السيرة الذاتية",
    cvHint: "PDF أو Word. الحجم الأقصى 8 ميجا.",
    cvPick: "اضغط لإرفاق السيرة الذاتية",
    cvPicked: "تم اختيار",
    submit: "إرسال الطلب",
    sending: "جاري الإرسال...",
    ok: "شكراً لك. تم إرسال طلبك كاملاً. سنتواصل معك.",
    err: "تعذر الإرسال. حاول مرة أخرى.",
    needEmail: "ضع بريدك في ملف config.js أولاً ثم أعد المحاولة.",
    required: "أكمل الحقول المطلوبة.",
    fileBig: "يجب ألا يتجاوز ملف السيرة 8 ميجا.",
    successTitle: "تم إرسال الطلب",
    successText: "استلمنا النموذج والسيرة الذاتية. سيراجعه فريق وصل.",
    footer: "وصل — انضم إلى فريق التسويق",
  },
};

const MAX_FILE = 8 * 1024 * 1024;
const form = document.getElementById("join-form");
const extra = document.getElementById("experience-extra");
const fileBox = document.getElementById("file-box");
const fileName = document.getElementById("file-name");
const statusEl = document.getElementById("status");
const successEl = document.getElementById("success");
const submitBtn = document.getElementById("submit-btn");

function currentLang() {
  const saved = localStorage.getItem("wasl-marketer-lang");
  if (saved === "ar" || saved === "en") return saved;
  return (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "ar";
}

function applyLang(lang) {
  const t = I18N[lang];
  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;
  document.title = lang === "ar" ? "كن مسوّق وصل | WASL" : "Be a WASL Marketer | وصل";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t[el.dataset.i18nPlaceholder];
  });
  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  const file = form.attachment.files[0];
  fileName.textContent = file ? `${t.cvPicked}: ${file.name}` : t.cvPick;
  localStorage.setItem("wasl-marketer-lang", lang);
}

function showStatus(type, message) {
  statusEl.className = `status show ${type}`;
  statusEl.textContent = message;
}

function inbox() {
  return String(window.WASL_CONFIG?.inbox || "").trim();
}

function inboxReady() {
  const email = inbox();
  return email && !/your_email@example\.com/i.test(email);
}

function toggleExperience() {
  const yes = form.querySelector('input[name="marketedBefore"]:checked')?.value === "Yes";
  extra.classList.toggle("open", yes);
  form.marketedFor.required = yes;
  form.marketingResult.required = yes;
}

document.querySelectorAll(".lang button").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

form.querySelectorAll('input[name="marketedBefore"]').forEach((el) => {
  el.addEventListener("change", toggleExperience);
});

form.attachment.addEventListener("change", () => {
  const t = I18N[currentLang()];
  const file = form.attachment.files[0];
  fileBox.classList.toggle("ready", Boolean(file));
  fileName.textContent = file ? `${t.cvPicked}: ${file.name}` : t.cvPick;
});

if (new URLSearchParams(location.search).get("sent") === "1") {
  form.hidden = true;
  successEl.hidden = false;
  successEl.classList.add("show");
}

applyLang(currentLang());
toggleExperience();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const t = I18N[currentLang()];

  if (!inboxReady()) {
    showStatus("err", t.needEmail);
    return;
  }

  if (!form.reportValidity()) {
    showStatus("err", t.required);
    return;
  }

  const file = form.attachment.files[0];
  if (file && file.size > MAX_FILE) {
    showStatus("err", t.fileBig);
    return;
  }

  form.querySelector('[name="_subject"]').value = `WASL marketer application — ${form.fullName.value}`;
  form.querySelector('[name="formLanguage"]').value = currentLang() === "ar" ? "Arabic" : "English";
  if (location.protocol.startsWith("http")) {
    form.querySelector('[name="_next"]').value = `${location.origin}${location.pathname}?sent=1`;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t.sending;
  form.action = `https://formsubmit.co/${encodeURIComponent(inbox())}`;
  form.submit();
});
