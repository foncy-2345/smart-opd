// ======================================
// SMART OPD - COMPLETE DEMO APPLICATION
// ======================================
const main = document.querySelector("main");
const homePage = main.innerHTML;
const STORAGE = {
  account: "smartOPDAccount",
  loggedIn: "smartOPDLoggedIn",
  appointment: "smartOPDAppointment",
  family: "smartOPDFamily",
  delivery: "smartOPDDelivery",
  history: "smartOPDHistory",
  notifications: "smartOPDNotifications"
};
const getData = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
function getServiceImage(imageId) {
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=900&q=85`;
}
const serviceInfo = {
  appointment: {
    icon: "📅",
    title: "นัดหมายออนไลน์",
    subtitle: "สะดวก รวดเร็ว ไม่ต้องรอคิว",
    image: "photo-1551076805-e1869033e561",
    color: "blue"
  },
  booking: {
    icon: "🏥",
    title: "จองคิวตรวจรักษา",
    subtitle: "เลือกแผนกและจองคิวได้ง่าย ๆ",
    image: "photo-1586773860418-d37222d8fce3",
    color: "green"
  },
  results: {
    icon: "📄",
    title: "ผลตรวจและใบสั่งยา",
    subtitle: "ตรวจสอบข้อมูลสุขภาพของคุณ",
    image: "photo-1576091160399-112ba8d25d1d",
    color: "purple"
  },
  family: {
    icon: "👨‍👩‍👧",
    title: "ดูแลครอบครัว",
    subtitle: "จัดการข้อมูลสุขภาพคนที่คุณรัก",
    image: "photo-1511895426328-dc8714191300",
    color: "pink"
  },
  blood: {
    icon: "🩸",
    title: "เจาะเลือดใกล้บ้าน",
    subtitle: "นัดหมายบริการเจาะเลือด",
    image: "photo-1579684385127-1ef15d508118",
    color: "red"
  },
  rights: {
    icon: "🛡️",
    title: "สิทธิ์และชำระเงิน",
    subtitle: "ตรวจสอบสิทธิและค่าใช้จ่าย",
    image: "photo-1450101499163-c8848c66ca85",
    color: "orange"
  },
  delivery: {
    icon: "🚚",
    title: "จัดส่งยาถึงบ้าน",
    subtitle: "รับยาที่บ้านอย่างสะดวก",
    image: "photo-1584308666744-24d5c474f2ae",
    color: "teal"
  },
  tracking: {
    icon: "📦",
    title: "ติดตามพัสดุ",
    subtitle: "ตรวจสอบสถานะการจัดส่ง",
    image: "photo-1607082349566-187342175e2f",
    color: "indigo"
  },
  certificate: {
    icon: "📋",
    title: "ใบรับรองแพทย์ดิจิทัล",
    subtitle: "จัดการเอกสารทางการแพทย์",
    image: "photo-1454165804606-c3d57bc86b40",
    color: "cyan"
  }
};
// ======================================
// LOGIN AND REGISTER
// ======================================
const loginScreen = document.getElementById("loginScreen");
const appRoot = document.getElementById("appRoot");
function showLogin() {
  loginScreen.style.display = "flex";
  appRoot.style.display = "none";
}
function showApp() {
  loginScreen.style.display = "none";
  appRoot.style.display = "block";
  showTab("home");
}
document.getElementById("showRegister").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("showRegister").style.display = "none";
  document.querySelector(".login-divider").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
});
document.getElementById("backToLogin").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("showRegister").style.display = "block";
  document.querySelector(".login-divider").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
});
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const citizen = document.getElementById("registerCitizen").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  if (!name || !/^\d{13}$/.test(citizen) || !/^\d{10}$/.test(phone)) {
    alert("กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
    return;
  }
  // บันทึกเฉพาะชื่อสำหรับบัญชีทดลอง
  // ไม่บันทึกเลขบัตรประชาชนหรือเบอร์โทรศัพท์
  saveData(STORAGE.account, { name });
  alert("สมัครสมาชิกตัวอย่างสำเร็จ กรุณาเข้าสู่ระบบ");
  document.getElementById("registerForm").reset();
  document.getElementById("backToLogin").click();
});
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const citizen = document.getElementById("loginCitizen").value.trim();
  const phone = document.getElementById("loginPhone").value.trim();
  const account = getData(STORAGE.account, null);
  if (!/^\d{13}$/.test(citizen) || !/^\d{10}$/.test(phone)) {
    alert("กรุณากรอกข้อมูลตัวอย่างให้ครบถ้วน");
    return;
  }
  if (!account) {
    alert("ยังไม่มีบัญชีทดลอง กรุณาสมัครสมาชิกก่อน");
    return;
  }
  const otp = prompt("ระบบ OTP จำลอง\nกรุณากรอกรหัสทดสอบ 123456");
  if (otp !== "123456") {
    alert("รหัส OTP ไม่ถูกต้อง");
    return;
  }
  localStorage.setItem(STORAGE.loggedIn, "true");
  showApp();
});
// ======================================
// APP STARTUP
// ======================================
if (localStorage.getItem(STORAGE.loggedIn) === "true") {
  showApp();
} else {
  showLogin();
}
// ======================================
// NAVIGATION
// ======================================
function setActiveNav(tab) {
  document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.classList.remove("active");
  });
  const active = document.getElementById(
    "nav" + tab.charAt(0).toUpperCase() + tab.slice(1)
  );
  if (active) active.classList.add("active");
}
function showTab(tab) {
  if (!appRoot || appRoot.style.display === "none") return;
  setActiveNav(tab);
  if (tab === "home") {
    main.innerHTML = homePage;
  }
  if (tab === "history") {
    renderHistory();
  }
  if (tab === "notifications") {
    renderNotifications();
  }
  if (tab === "settings") {
    renderSettings();
  }
  window.scrollTo(0, 0);
}
// ======================================
// SERVICE HISTORY
// ======================================
function addHistory(title, detail) {
  const history = getData(STORAGE.history);
  history.unshift({
    title,
    detail,
    date: new Date().toLocaleString("th-TH")
  });
  saveData(STORAGE.history, history);
  addNotification("บันทึกบริการแล้ว", title);
}
function renderHistory() {
  const history = getData(STORAGE.history);
  main.innerHTML = `
    <section class="service-page">
      <div class="page-content">
        <h2>📋 ประวัติการใช้บริการ</h2>
        ${
          history.length
            ? history.map(item => `
              <div class="form-card">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.detail)}</p>
                <small>${escapeHTML(item.date)}</small>
              </div>
            `).join("")
            : `<div class="form-card">
                 <p>ยังไม่มีประวัติการใช้บริการ</p>
               </div>`
        }
      </div>
    </section>
  `;
}
// ======================================
// NOTIFICATIONS
// ======================================
function addNotification(title, message) {
  const notifications = getData(STORAGE.notifications);
  notifications.unshift({
    title,
    message,
    date: new Date().toLocaleString("th-TH"),
    read: false
  });
  saveData(STORAGE.notifications, notifications);
  updateNotificationBadge();
}
function updateNotificationBadge() {
  const badge = document.getElementById("notificationBadge");
  if (!badge) return;
  const unread = getData(STORAGE.notifications)
    .filter(item => !item.read).length;
  badge.textContent = unread;
  badge.style.display = unread ? "inline-block" : "none";
}
function renderNotifications() {
  const notifications = getData(STORAGE.notifications);
  notifications.forEach(item => item.read = true);
  saveData(STORAGE.notifications, notifications);
  updateNotificationBadge();
  main.innerHTML = `
    <section class="service-page">
      <div class="page-content">
        <h2>🔔 การแจ้งเตือน</h2>
        ${
          notifications.length
            ? notifications.map(item => `
              <div class="form-card">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.message)}</p>
                <small>${escapeHTML(item.date)}</small>
              </div>
            `).join("")
            : `<div class="form-card">
                 <p>ไม่มีการแจ้งเตือนในขณะนี้</p>
               </div>`
        }
      </div>
    </section>
  `;
}
// ======================================
// SETTINGS
// ======================================
function renderSettings() {
  const account = getData(STORAGE.account, { name: "ผู้ใช้งาน" });
  main.innerHTML = `
    <section class="service-page">
      <div class="page-content">
        <h2>⚙️ ตั้งค่าบัญชี</h2>
        <div class="form-card">
          <h3>👤 ข้อมูลผู้ใช้งาน</h3>
          <p>ชื่อ: ${escapeHTML(account.name)}</p>
          <p class="notice">บัญชีทดลอง Smart OPD</p>
        </div>
        <div class="form-card">
          <h3>🔔 การแจ้งเตือน</h3>
          <p>ระบบแจ้งเตือนภายในแอป</p>
        </div>
        <div class="form-card">
          <button class="action-button" onclick="logout()">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </section>
  `;
}
function logout() {
  if (!confirm("ต้องการออกจากระบบหรือไม่?")) return;
  localStorage.removeItem(STORAGE.loggedIn);
  showLogin();
}
// ======================================
// SERVICE PAGES
// ======================================
function openPage(page) {
  const info = serviceInfo[page];
  if (!info) return;
  let content = "";
  if (page === "appointment" || page === "booking") {
    content = `
      <div class="form-card">
        <h2>👨‍⚕️ เลือกแผนก</h2>
        <form id="appointmentForm">
          <label>เลือกแผนกที่ต้องการ</label>
          <select id="department" required>
            <option value="">เลือกแผนก</option>
            <option>อายุรกรรม</option>
            <option>กุมารเวชกรรม</option>
            <option>ศัลยกรรม</option>
            <option>สูตินรีเวช</option>
            <option>ทันตกรรม</option>
            <option>จักษุกรรม</option>
          </select>
          <label>เลือกวันที่</label>
          <input type="date" id="date" required>
          <label>เลือกเวลา</label>
          <select id="time" required>
            <option value="">เลือกเวลา</option>
            <option>08:30 - 09:00</option>
            <option>09:00 - 09:30</option>
            <option>09:30 - 10:00</option>
            <option>10:00 - 10:30</option>
            <option>10:30 - 11:00</option>
            <option>13:00 - 13:30</option>
            <option>13:30 - 14:00</option>
          </select>
          <button class="action-button" type="submit">
            📅 ยืนยันนัดหมาย
          </button>
        </form>
      </div>
      <div class="form-card">
        <h3>📌 นัดหมายล่าสุด</h3>
        <div id="appointmentData">ยังไม่มีข้อมูลนัดหมาย</div>
      </div>
    `;
  }
  if (page === "results") {
    content = `
      <div class="form-card">
        <h3>🩺 ผลตรวจสุขภาพ</h3>
        <p>ความดันโลหิต : 120/80 mmHg</p>
        <p>ระดับน้ำตาล : 92 mg/dL</p>
        <p>ไขมันในเลือด : 180 mg/dL</p>
        <p class="notice">ข้อมูลทั้งหมดเป็นข้อมูลจำลอง</p>
      </div>
      <div class="form-card">
        <h3>💊 รายการยา</h3>
        <p>ไม่มีรายการยาจริงในระบบตัวอย่าง</p>
      </div>
    `;
  }
  if (page === "family") {
    content = `
      <div class="form-card">
        <h3>👨‍👩‍👧 สมาชิกในครอบครัว</h3>
        <div id="familyList"></div>
        <label>ชื่อสมาชิก</label>
        <input id="familyName" placeholder="กรอกชื่อสมาชิก">
        <button class="action-button" onclick="addFamily()">
          + เพิ่มสมาชิก
        </button>
      </div>
    `;
  }
  if (page === "blood") {
    content = `
      <div class="form-card">
        <h3>🩸 จองบริการเจาะเลือด</h3>
        <label>เลือกวันที่</label>
        <input type="date" id="bloodDate" required>
        <label>สถานที่ให้บริการ</label>
        <input id="bloodAddress" placeholder="ใช้ที่อยู่สมมติในการทดสอบ">
        <button class="action-button" onclick="bookBlood()">
          ยืนยันการจอง
        </button>
      </div>
    `;
  }
  if (page === "rights") {
    content = `
      <div class="form-card">
        <h3>🛡️ สิทธิการรักษา</h3>
        <label>เลือกสิทธิการรักษา</label>
        <select id="healthRight">
          <option>หลักประกันสุขภาพแห่งชาติ</option>
          <option>ประกันสังคม</option>
          <option>สวัสดิการข้าราชการ</option>
          <option>ชำระเงินเอง</option>
        </select>
        <button class="action-button"
          onclick="alert('ระบบตัวอย่าง กรุณาตรวจสอบสิทธิจริงกับโรงพยาบาล')">
          ตรวจสอบสิทธิ
        </button>
      </div>
      <div class="form-card">
        <h3>💳 ชำระค่าบริการ</h3>
        <p>ยอดตัวอย่าง 0.00 บาท</p>
        <button class="action-button"
          onclick="alert('ระบบชำระเงินนี้เป็นเพียงตัวอย่าง')">
          ชำระเงิน
        </button>
      </div>
    `;
  }
  if (page === "delivery") {
    content = `
      <div class="form-card">
        <h3>🚚 ข้อมูลจัดส่งยา</h3>
        <label>ชื่อผู้รับ</label>
        <input id="receiver" placeholder="ชื่อสมมติ">
        <label>ที่อยู่จัดส่ง</label>
        <textarea id="deliveryAddress"
          placeholder="ใช้ที่อยู่สมมติในการทดสอบ"></textarea>
        <label>เบอร์โทรศัพท์</label>
        <input id="phone" type="tel"
          placeholder="ใช้เบอร์สมมติในการทดสอบ">
        <button class="action-button" onclick="orderMedicine()">
          ยืนยันจัดส่งยา
        </button>
      </div>
    `;
  }
  if (page === "tracking") {
    content = `
      <div class="form-card">
        <h3>📦 ติดตามพัสดุ</h3>
        <label>หมายเลขพัสดุ</label>
        <input id="trackingNumber"
          placeholder="กรอกหมายเลขทดสอบ">
        <button class="action-button" onclick="trackParcel()">
          ตรวจสอบสถานะ
        </button>
        <div id="trackingResult"></div>
      </div>
    `;
  }
  if (page === "certificate") {
    content = `
      <div class="form-card">
        <h3>📋 เอกสารทางการแพทย์</h3>
        <p>บริการดาวน์โหลดเอกสารตัวอย่าง</p>
        <button class="action-button"
          onclick="downloadCertificate()">
          ดาวน์โหลดเอกสารตัวอย่าง
        </button>
        <p class="notice">
          เอกสารนี้ไม่ใช่ใบรับรองแพทย์จริง
        </p>
      </div>
    `;
  }
  main.innerHTML = `
    <section class="service-page page-${info.color}">
      <button class="back-button" onclick="goHome()">
        ← กลับหน้าหลัก
      </button>
      <div class="hospital-brand">
        <span>✚</span>
        <div>
          <h2>Smart OPD</h2>
          <p>โรงพยาบาลอัจฉริยะ</p>
        </div>
      </div>
      <div class="service-hero"
        style="background-image:
        linear-gradient(90deg,rgba(0,45,90,.85),rgba(0,70,120,.25)),
        url('https://images.unsplash.com/${info.image}?auto=format&fit=crop&w=1200&q=85')">
        <div class="hero-icon">${info.icon}</div>
        <h1>${info.title}</h1>
        <p>${info.subtitle}</p>
      </div>
      <div class="page-content">
        ${content}
      </div>
    </section>
  `;
  if (page === "family") showFamily();
  if (page === "appointment" || page === "booking") {
    setupAppointment();
    showAppointment();
  }
  window.scrollTo(0, 0);
}
function goHome() {
  showTab("home");
}
// ======================================
// APPOINTMENT
// ======================================
function setupAppointment() {
  const form = document.getElementById("appointmentForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
      department: document.getElementById("department").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value
    };
    saveData(STORAGE.appointment, data);
    addHistory(
      "นัดหมายออนไลน์",
      `${data.department} วันที่ ${data.date} เวลา ${data.time}`
    );
    alert("บันทึกนัดหมายตัวอย่างเรียบร้อย");
    showAppointment();
  });
}
function showAppointment() {
  const box = document.getElementById("appointmentData");
  if (!box) return;
  const data = getData(STORAGE.appointment, null);
  box.innerHTML = data
    ? `<p>แผนก: ${escapeHTML(data.department)}</p>
       <p>วันที่: ${escapeHTML(data.date)}</p>
       <p>เวลา: ${escapeHTML(data.time)}</p>`
    : "ยังไม่มีข้อมูลนัดหมาย";
}
// ======================================
// FAMILY
// ======================================
function showFamily() {
  const list = document.getElementById("familyList");
  if (!list) return;
  const members = getData(STORAGE.family);
  list.innerHTML = members.map(name =>
    `<p>👤 ${escapeHTML(name)}</p>`
  ).join("");
}
function addFamily() {
  const input = document.getElementById("familyName");
  if (!input || !input.value.trim()) {
    alert("กรุณากรอกชื่อสมาชิก");
    return;
  }
  const members = getData(STORAGE.family);
  members.push(input.value.trim());
  saveData(STORAGE.family, members);
  input.value = "";
  showFamily();
  addHistory("ดูแลครอบครัว", "เพิ่มสมาชิกในครอบครัว");
}
// ======================================
// BLOOD SERVICE
// ======================================
function bookBlood() {
  const date = document.getElementById("bloodDate").value;
  const address = document.getElementById("bloodAddress").value;
  if (!date || !address.trim()) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }
  addHistory("จองบริการเจาะเลือด", `วันที่ ${date}`);
  alert("บันทึกคำขอเจาะเลือดตัวอย่างแล้ว");
}
// ======================================
// MEDICINE DELIVERY
// ======================================
function orderMedicine() {
  const receiver = document.getElementById("receiver").value;
  const address = document.getElementById("deliveryAddress").value;
  const phone = document.getElementById("phone").value;
  if (!receiver.trim() || !address.trim() || !phone.trim()) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }
  saveData(STORAGE.delivery, { receiver, address });
  addHistory("จัดส่งยาถึงบ้าน", "บันทึกคำขอจัดส่งตัวอย่างแล้ว");
  alert("บันทึกคำขอจัดส่งตัวอย่างแล้ว");
}
// ======================================
// TRACKING
// ======================================
function trackParcel() {
  const number = document.getElementById("trackingNumber").value;
  const result = document.getElementById("trackingResult");
  if (!number.trim()) {
    alert("กรุณากรอกหมายเลขพัสดุ");
    return;
  }
  result.innerHTML = `
    <div class="status-box">
      <h3>สถานะการจัดส่งตัวอย่าง</h3>
      <p>✓ รับคำขอแล้ว</p>
      <p>○ รอข้อมูลจากระบบขนส่งจริง</p>
      <small>หมายเลข: ${escapeHTML(number)}</small>
    </div>
  `;
}
// ======================================
// CERTIFICATE
// ======================================
function downloadCertificate() {
  const content = `
SMART OPD
เอกสารตัวอย่างสำหรับทดสอบระบบ
ไม่ใช่ใบรับรองแพทย์ที่ออกโดยโรงพยาบาล
`;
  const blob = new Blob(
    [content],
    { type: "text/plain;charset=utf-8" }
  );
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "SmartOPD-Certificate.txt";
  link.click();
  URL.revokeObjectURL(url);
}
// ======================================
// SECURITY HELPER
// ======================================
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
// ======================================
// INITIALIZE
// ======================================
updateNotificationBadge();
console.log("SMART OPD READY");