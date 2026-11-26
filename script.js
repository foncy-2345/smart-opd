// ==================================
// SMART OPD - MODERN HOSPITAL APP
// ==================================

const main = document.querySelector("main");
const homePage = main.innerHTML;

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
        <input id="bloodAddress" placeholder="กรอกที่อยู่">
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
        <input id="receiver" placeholder="ชื่อผู้รับยา">
        <label>ที่อยู่จัดส่ง</label>
        <textarea id="deliveryAddress"
          placeholder="กรอกที่อยู่จัดส่ง"></textarea>
        <label>เบอร์โทรศัพท์</label>
        <input id="phone" type="tel"
          placeholder="กรอกเบอร์โทรศัพท์">
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
          placeholder="กรอกหมายเลขพัสดุ">
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
  main.innerHTML = homePage;
  window.scrollTo(0, 0);
}

// นัดหมาย
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

    localStorage.setItem("smartOPDAppointment", JSON.stringify(data));
    alert("บันทึกนัดหมายตัวอย่างเรียบร้อย");
    showAppointment();
  });
}

function showAppointment() {
  const box = document.getElementById("appointmentData");
  if (!box) return;

  const data = JSON.parse(
    localStorage.getItem("smartOPDAppointment") || "null"
  );

  box.innerHTML = data
    ? `<p>แผนก: ${data.department}</p>
       <p>วันที่: ${data.date}</p>
       <p>เวลา: ${data.time}</p>`
    : "ยังไม่มีข้อมูลนัดหมาย";
}

// ครอบครัว
function showFamily() {
  const list = document.getElementById("familyList");
  if (!list) return;

  const members = JSON.parse(
    localStorage.getItem("smartOPDFamily") || "[]"
  );

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

  const members = JSON.parse(
    localStorage.getItem("smartOPDFamily") || "[]"
  );

  members.push(input.value.trim());
  localStorage.setItem("smartOPDFamily", JSON.stringify(members));
  input.value = "";
  showFamily();
}

// เจาะเลือด
function bookBlood() {
  const date = document.getElementById("bloodDate").value;
  const address = document.getElementById("bloodAddress").value;

  if (!date || !address.trim()) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  alert("บันทึกคำขอเจาะเลือดตัวอย่างแล้ว");
}

// จัดส่งยา
function orderMedicine() {
  const receiver = document.getElementById("receiver").value;
  const address = document.getElementById("deliveryAddress").value;
  const phone = document.getElementById("phone").value;

  if (!receiver.trim() || !address.trim() || !phone.trim()) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  localStorage.setItem(
    "smartOPDDelivery",
    JSON.stringify({receiver, address, phone})
  );

  alert("บันทึกคำขอจัดส่งตัวอย่างแล้ว");
}

// ติดตามพัสดุ
function trackParcel() {
  const number = document.getElementById("trackingNumber").value;
  const result = document.getElementById("trackingResult");

  if (!number.trim()) {
    alert("กรุณากรอกหมายเลขพัสดุ");
    return;
  }

  result.innerHTML = `
    <div class="status-box">
      <h3>สถานะการจัดส่ง</h3>
      <p>✓ รับคำขอแล้ว</p>
      <p>○ รอข้อมูลจากระบบขนส่งจริง</p>
      <small>หมายเลข: ${escapeHTML(number)}</small>
    </div>
  `;
}

// ดาวน์โหลดเอกสารตัวอย่าง
function downloadCertificate() {
  const content = `
SMART OPD
เอกสารตัวอย่างสำหรับทดสอบระบบ
ไม่ใช่ใบรับรองแพทย์ที่ออกโดยโรงพยาบาล
`;

  const blob = new Blob(
    [content],
    {type: "text/plain;charset=utf-8"}
  );

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "SmartOPD-Certificate.txt";
  link.click();

  URL.revokeObjectURL(link.href);
}

// ป้องกัน HTML แทรกในข้อมูล
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

console.log("SMART OPD READY");
