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
    before: "Have you done marketing before?",
    yes: "Yes",
    no: "No",
    forWhat: "For what did you market?",
    forWhatPh: "Product, company, or service",
    result: "How was the result?",
    resultPh: "What happened, and what did you achieve?",
    cv: "CV",
    cvHint: "PDF or Word only. 20 KB to 2 MB.",
    cvPick: "Click to attach your CV",
    cvPicked: "Selected",
    submit: "Send application",
    sending: "Sending...",
    ok: "Thank you. Your full application was sent. We will contact you.",
    err: "Could not send. Please try again.",
    needEmail: "Put your email in config.js first (inbox), then try again.",
    required: "Please fill the required fields.",
    fileBig: "The CV must be 2 MB or smaller.",
    fileSmall: "The CV file is too small.",
    fileType: "Use a PDF or Word file only.",
    successTitle: "Thank you",
    successText: "The WASL team will contact you within 2 weeks.",
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
    before: "هل سبق أن عملت في التسويق؟",
    yes: "نعم",
    no: "لا",
    forWhat: "سوّقت لأي شيء؟",
    forWhatPh: "منتج أو شركة أو خدمة",
    result: "كيف كانت النتيجة؟",
    resultPh: "ماذا حصل، وما الذي حققته؟",
    cv: "السيرة الذاتية",
    cvHint: "PDF أو Word فقط. من 20 كيلو إلى 2 ميجا.",
    cvPick: "اضغط لإرفاق السيرة الذاتية",
    cvPicked: "تم اختيار",
    submit: "إرسال الطلب",
    sending: "جاري الإرسال...",
    ok: "شكراً لك. تم إرسال طلبك كاملاً. سنتواصل معك.",
    err: "تعذر الإرسال. حاول مرة أخرى.",
    needEmail: "ضع بريدك في ملف config.js أولاً ثم أعد المحاولة.",
    required: "أكمل الحقول المطلوبة.",
    fileBig: "يجب ألا يتجاوز ملف السيرة 2 ميجا.",
    fileSmall: "ملف السيرة صغير جداً.",
    fileType: "استخدم ملف PDF أو Word فقط.",
    successTitle: "شكراً لك",
    successText: "سيتواصل معك فريق وصل خلال أسبوعين.",
    footer: "وصل — انضم إلى فريق التسويق",
  },
};

const MIN_FILE = 20 * 1024;
const MAX_FILE = 2 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx"];
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
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

function fileExtension(name) {
  const lower = String(name || "").toLowerCase();
  const parts = lower.split(".").filter(Boolean);
  if (parts.length < 2) return "";
  const dangerous = ["exe", "js", "html", "htm", "svg", "bat", "cmd", "scr", "com", "jar", "php", "pif", "msi", "dll"];
  if (parts.slice(0, -1).some((part) => dangerous.includes(part))) return "";
  return parts[parts.length - 1];
}

async function looksLikeSafeCv(file) {
  const header = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const pdf = header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46;
  const doc = header[0] === 0xd0 && header[1] === 0xcf && header[2] === 0x11 && header[3] === 0xe0;
  const docx = header[0] === 0x50 && header[1] === 0x4b;
  return pdf || doc || docx;
}

async function cvError(file) {
  if (!file) return "required";
  if (file.size < MIN_FILE) return "fileSmall";
  if (file.size > MAX_FILE) return "fileBig";
  const ext = fileExtension(file.name);
  if (!ALLOWED_EXT.includes(ext)) return "fileType";
  if (file.type && !ALLOWED_TYPES.includes(file.type)) return "fileType";
  if (!(await looksLikeSafeCv(file))) return "fileType";
  return "";
}

function clearCv() {
  form.attachment.value = "";
  fileBox.classList.remove("ready");
  fileName.textContent = I18N[currentLang()].cvPick;
}

form.attachment.addEventListener("change", async () => {
  const t = I18N[currentLang()];
  const file = form.attachment.files[0];
  if (!file) {
    clearCv();
    return;
  }
  const error = await cvError(file);
  if (error) {
    clearCv();
    showStatus("err", t[error]);
    return;
  }
  statusEl.className = "status";
  fileBox.classList.add("ready");
  fileName.textContent = `${t.cvPicked}: ${file.name}`;
});

if (new URLSearchParams(location.search).get("sent") === "1") {
  showSuccess();
}

applyLang(currentLang());
toggleExperience();

function showSuccess() {
  form.hidden = true;
  successEl.hidden = false;
  successEl.classList.add("show");
  successEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function uploadCv(file) {
  try {
    const body = new FormData();
    body.append("file", file, file.name);
    body.append("expire", "172800");
    const res = await fetch("https://tmpfiles.org/api/v1/upload", { method: "POST", body });
    const json = await res.json();
    const url = json?.data?.url;
    if (url) return url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
  } catch (_) {
    /* try next host */
  }
  try {
    const body = new FormData();
    body.append("reqtype", "fileupload");
    body.append("time", "72h");
    body.append("fileToUpload", file, file.name);
    const res = await fetch("https://litterbox.catbox.moe/resources/tools/api.php", { method: "POST", body });
    const text = (await res.text()).trim();
    if (/^https?:\/\//i.test(text)) return text;
  } catch (_) {
    /* native attachment remains */
  }
  return "";
}

form.addEventListener("submit", async (event) => {
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
  const fileProblem = await cvError(file);
  if (fileProblem) {
    showStatus("err", t[fileProblem]);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t.sending;

  const cvLink = await uploadCv(file);
  form.querySelector('[name="CV_File_Name"]').value = file.name;
  form.querySelector('[name="CV_Download_Link"]').value = cvLink || "";
  form.querySelector('[name="_subject"]').value = `WASL marketer application — ${form.fullName.value}`;
  form.querySelector('[name="formLanguage"]').value = currentLang() === "ar" ? "Arabic" : "English";
  form.querySelector('[name="_next"]').value = `${location.origin}${location.pathname}?sent=1`;

  form.action = `https://formsubmit.co/${encodeURIComponent(inbox())}`;

  if (!cvLink) {
    form.submit();
    return;
  }

  const payload = new FormData(form);
  payload.set("attachment", file, file.name);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox())}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success !== false) {
      showSuccess();
      return;
    }
  } catch (_) {
    /* fall back to a normal form post so the CV still goes */
  }

  form.submit();
});
