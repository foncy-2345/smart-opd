// SMART OPD APPLICATION
// ระบบจัดการหน้าจอและบริการโรงพยาบาล

const main = document.querySelector("main");

const homePage = main.innerHTML;

// เปลี่ยนหน้า
function openPage(page) {

    const pages = {

        appointment: `
            <h2>📅 นัดหมายออนไลน์</h2>
            <p>จัดการนัดหมายของคุณ</p>

            <div class="appointment">
                <h3>นัดหมายล่าสุด</h3>
                <p id="appointmentData">
                    ยังไม่มีนัดหมาย
                </p>
            </div>

            <h3>สร้างนัดหมายใหม่</h3>

            <form id="appointmentForm">

                <label>เลือกแผนก</label>
                <select id="department" required>
                    <option value="">เลือกแผนก</option>
                    <option>อายุรกรรม</option>
                    <option>กุมารเวชกรรม</option>
                    <option>ศัลยกรรม</option>
                    <option>สูตินรีเวช</option>
                </select>

                <br><br>

                <label>เลือกวันที่</label>
                <input type="date" id="date" required>

                <br><br>

                <label>เลือกเวลา</label>
                <select id="time">
                    <option>08:30 - 09:00</option>
                    <option>09:00 - 09:30</option>
                    <option>09:30 - 10:00</option>
                    <option>10:00 - 10:30</option>
                    <option>10:30 - 11:00</option>
                </select>

                <br><br>

                <button type="submit">
                    ยืนยันนัดหมาย
                </button>

            </form>
        `,

        booking: `
            <h2>🏥 จองคิวตรวจรักษา</h2>
            <p>เลือกแผนกและเวลาที่ต้องการ</p>

            <div class="appointment">
                <h3>ขั้นตอนการจอง</h3>
                <p>1. เลือกแผนก</p>
                <p>2. เลือกวันและเวลา</p>
                <p>3. ยืนยันการจอง</p>
            </div>

            <button onclick="openPage('appointment')">
                เริ่มจองคิว
            </button>
        `,

        results: `
            <h2>📄 ผลตรวจและใบสั่งยา</h2>

            <div class="appointment">
                <h3>ผลตรวจสุขภาพ</h3>
                <p>ความดันโลหิต 120/80 mmHg</p>
                <p>ระดับน้ำตาล 92 mg/dL</p>
                <p>ไขมันในเลือด 180 mg/dL</p>
            </div>

            <div class="appointment">
                <h3>รายการยา</h3>
                <p>Paracetamol 500 mg</p>
                <p>Vitamin B Complex</p>
            </div>

            <p>ข้อมูลทั้งหมดเป็นข้อมูลจำลอง</p>
        `,

        family: `
            <h2>👨‍👩‍👧 ดูแลครอบครัว</h2>

            <div class="appointment">
                <h3>สมาชิกในครอบครัว</h3>

                <div id="familyList"></div>

                <input
                    id="familyName"
                    placeholder="ชื่อสมาชิก"
                >

                <button onclick="addFamily()">
                    + เพิ่มสมาชิก
                </button>
            </div>
        `,

        blood: `
            <h2>🩸 เจาะเลือดใกล้บ้าน</h2>

            <div class="appointment">
                <h3>จองบริการเจาะเลือด</h3>

                <label>วันที่</label>
                <input type="date" id="bloodDate">

                <br><br>

                <label>สถานที่</label>
                <input
                    id="bloodAddress"
                    placeholder="กรอกที่อยู่"
                >

                <br><br>

                <button onclick="bookBlood()">
                    ยืนยันการจอง
                </button>
            </div>
        `,

        rights: `
            <h2>🛡️ สิทธิ์และชำระเงิน</h2>

            <div class="appointment">
                <h3>สิทธิการรักษา</h3>
                <p>สิทธิหลักประกันสุขภาพแห่งชาติ</p>
                <p>สถานะ: ข้อมูลตัวอย่าง</p>
            </div>

            <div class="appointment">
                <h3>ชำระค่าบริการ</h3>
                <p>ยอดค้างชำระ 0.00 บาท</p>
                <button onclick="alert('ระบบชำระเงินตัวอย่าง')">
                    ชำระเงินผ่าน QR
                </button>
            </div>
        `,

        delivery: `
            <h2>🚚 จัดส่งยาถึงบ้าน</h2>

            <div class="appointment">
                <h3>ข้อมูลจัดส่ง</h3>

                <input
                    id="deliveryAddress"
                    placeholder="กรอกที่อยู่จัดส่ง"
                >

                <br><br>

                <input
                    id="phone"
                    placeholder="เบอร์โทรศัพท์"
                >

                <br><br>

                <button onclick="orderMedicine()">
                    ยืนยันจัดส่งยา
                </button>
            </div>
        `,

        tracking: `
            <h2>📦 ติดตามพัสดุ</h2>

            <div class="appointment">
                <h3>หมายเลขพัสดุ</h3>
                <h2>TH123456789TH</h2>

                <p>✓ รับพัสดุแล้ว</p>
                <p>✓ กำลังนำจ่าย</p>
                <p>○ จัดส่งสำเร็จ</p>
            </div>
        `,

        certificate: `
            <h2>📋 ใบรับรองแพทย์ดิจิทัล</h2>

            <div class="appointment">
                <h3>ใบรับรองแพทย์</h3>
                <p>ดาวน์โหลดเอกสารตัวอย่าง</p>

                <button onclick="downloadCertificate()">
                    ดาวน์โหลดเอกสาร
                </button>

                <p>เอกสารตัวอย่าง ไม่ใช่ใบรับรองแพทย์จริง</p>
            </div>
        `
    };

    if (!pages[page]) return;

    main.innerHTML = `
    <section class="service-page page-${page}">
        <button class="back-button" onclick="goHome()">
            ← กลับหน้าหลัก
        </button>

        <div class="page-content">
            ${pages[page]}
        </div>
    </section>
`;

    if (page === "family") {
        showFamily();
    }

    if (page === "appointment") {
        setupAppointment();
    }
}

// กลับหน้าหลัก
function goHome() {
    main.innerHTML = homePage;
}

// ระบบนัดหมาย
function setupAppointment() {

    const form = document.getElementById(
        "appointmentForm"
    );

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const data = {
            department: document.getElementById(
                "department"
            ).value,

            date: document.getElementById(
                "date"
            ).value,

            time: document.getElementById(
                "time"
            ).value
        };

        localStorage.setItem(
            "smartOPDAppointment",
            JSON.stringify(data)
        );

        alert("บันทึกการนัดหมายสำเร็จ");

        goHome();
    });
}

// ระบบสมาชิกครอบครัว
function showFamily() {

    const members = JSON.parse(
        localStorage.getItem("smartOPDFamily") || "[]"
    );

    const list = document.getElementById("familyList");

    list.innerHTML = members.map(name =>
        `<p>👤 ${escapeHTML(name)}</p>`
    ).join("");
}

function addFamily() {

    const input = document.getElementById("familyName");

    if (!input.value.trim()) {
        alert("กรุณากรอกชื่อสมาชิก");
        return;
    }

    const members = JSON.parse(
        localStorage.getItem("smartOPDFamily") || "[]"
    );

    members.push(input.value.trim());

    localStorage.setItem(
        "smartOPDFamily",
        JSON.stringify(members)
    );

    input.value = "";

    showFamily();
}

// ระบบเจาะเลือด
function bookBlood() {

    const date = document.getElementById("bloodDate").value;
    const address = document.getElementById("bloodAddress").value;

    if (!date || !address.trim()) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    alert("ส่งคำขอจองบริการเจาะเลือดแล้ว");
}

// ระบบจัดส่งยา
function orderMedicine() {

    const address = document.getElementById(
        "deliveryAddress"
    ).value;

    const phone = document.getElementById(
        "phone"
    ).value;

    if (!address.trim() || !phone.trim()) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    localStorage.setItem(
        "smartOPDDelivery",
        JSON.stringify({address, phone})
    );

    alert("บันทึกคำขอจัดส่งยาแล้ว");
}

// ดาวน์โหลดเอกสารตัวอย่าง
function downloadCertificate() {

    const content = `
ใบรับรองแพทย์
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

// ป้องกันข้อความ HTML จากชื่อสมาชิก
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

console.log("SMART OPD SYSTEM READY");
