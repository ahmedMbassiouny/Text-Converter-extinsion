const enToArMapping = {
  a: "ش",
  b: "\uFEFB",
  c: "ؤ",
  d: "ي",
  e: "ث",
  f: "ب",
  g: "ل",
  h: "ا",
  i: "ه",
  j: "ت",
  k: "ن",
  l: "م",
  m: "ة",
  n: "ى",
  o: "خ",
  p: "ح",
  q: "ض",
  r: "ق",
  s: "س",
  t: "ف",
  u: "ع",
  v: "ر",
  w: "ص",
  x: "ء",
  y: "غ",
  z: "ئ",
  A: "ِ",
  B: "لآ",
  C: "}",
  D: "]",
  E: "ُ",
  F: "[",
  G: "لأ",
  H: "أ",
  I: "÷",
  J: "ـ",
  K: "،",
  L: "/",
  M: "’",
  N: "آ",
  O: "×",
  P: "؛",
  Q: "َ",
  R: "ٌ",
  S: "ٍ",
  T: "لإ",
  U: "‘",
  V: "{",
  W: "ً",
  X: "ْ",
  Y: "إ",
  Z: "~",
  "`": "ذ",
  "[": "ج",
  "]": "د",
  ";": "ك",
  "'": "ط",
  ",": "و",
  ".": "ز",
  "/": "ظ",
  "~": "ّ",
  "{": "<",
  "}": ">",
  ":": ":",
  '"': '"',
  "<": ",",
  ">": ".",
  "?": "؟",
};

const arToEnMapping = {};
for (let key in enToArMapping) {
  arToEnMapping[enToArMapping[key]] = key;
}

function convertText(text) {
  // Check if the text is Arabic
  const isArabic = /[\u0600-\u06FF]/.test(text);

  const mapping = isArabic ? arToEnMapping : enToArMapping;

  return text
    .split("")
    .map((char) => mapping[char] || char)
    .join("");
}

// Popup script functionality
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("convert")) {
    document.getElementById("convert").addEventListener("click", () => {
      const inputText = document.getElementById("input").value;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        document.getElementById("result").innerText = convertText(inputText);
        document.getElementById("copy").style.display = "block";
      });
    });
  }

  if (document.getElementById("copy")) {
    document.getElementById("copy").addEventListener("click", () => {
      const resultText = document.getElementById("result").innerText;
      copyToClipboard(resultText);
      showNotification("Text copied to clipboard");
    });
  }
});

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// Function to show custom popup notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "notification show";
  setTimeout(() => {
    notification.className = "notification";
  }, 3000);
}
