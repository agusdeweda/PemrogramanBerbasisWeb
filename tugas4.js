// Variabel Global untuk menyimpan data antar tahap
let namaUser = "";
let jmlPilihan = 0;
let arrayPilihan = [];      
let pilihanTerpilih = "";   
let emailUser = "";

// Fungsi bantu perpindahan langkah (step) yang dinamis
function pindahStep(targetStep) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`step${i}`).classList.remove("active-step");
    }
    document.getElementById(`step${targetStep}`).classList.add("active-step");
}

// LANGKAH 1: Validasi Nama dan Jumlah Pilihan (Error Trapping)
function prosesLangkah1() {
    namaUser = document.getElementById("inputNama").value.trim();
    let jmlVal = document.getElementById("inputJml").value;
    jmlPilihan = parseInt(jmlVal);

    if (namaUser === "") {
        alert("Error: Nama tidak boleh kosong!");
        document.getElementById("inputNama").focus();
        return;
    }
    if (isNaN(jmlPilihan) || jmlPilihan <= 0) {
        alert("Error: Jumlah pilihan harus berupa angka bulat positif (> 0)!");
        document.getElementById("inputJml").focus();
        return;
    }

    // Buat input teks dinamis sebanyak <Jml> menggunakan loop
    let container = document.getElementById("containerPilihanInput");
    container.innerHTML = "";
    for (let i = 1; i <= jmlPilihan; i++) {
        container.innerHTML += `
            <div class="form-group">
                <label>Pilihan ${i} :</label>
                <input type="text" id="pilihan_${i}" placeholder="Masukkan Pilihan ke-${i}">
            </div>
        `;
    }

    // Tampilkan step 2, kunci input step 1
    pindahStep(2);
    document.getElementById("inputNama").disabled = true;
    document.getElementById("inputJml").disabled = true;
}

// LANGKAH 2: Mengambil teks pilihan ke dalam Array (Error Trapping)
function prosesLangkah2() {
    arrayPilihan = [];
    for (let i = 1; i <= jmlPilihan; i++) {
        let valPilihan = document.getElementById(`pilihan_${i}`).value.trim();
        if (valPilihan === "") {
            alert(`Error: Teks Pilihan ${i} tidak boleh kosong!`);
            document.getElementById(`pilihan_${i}`).focus();
            return;
        }
        arrayPilihan.push(valPilihan);
    }

    // Buat Radio Button secara dinamis dari array pilihan
    let containerRadio = document.getElementById("containerRadioPilihan");
    containerRadio.innerHTML = "";

    for (let i = 0; i < arrayPilihan.length; i++) {
        containerRadio.innerHTML += `
            <label class="radio-item">
                <input type="radio" name="pilihanGroup" value="${arrayPilihan[i]}">
                <span>${arrayPilihan[i]}</span>
            </label>
        `;
    }

    // Tampilkan step 3
    pindahStep(3);
}

// LANGKAH 3: Menetapkan pilihan dari Radio Button (Error Trapping)
function prosesLangkah3() {
    let radios = document.getElementsByName("pilihanGroup");
    pilihanTerpilih = "";

    for (let r of radios) {
        if (r.checked) {
            pilihanTerpilih = r.value;
            break;
        }
    }

    if (pilihanTerpilih === "") {
        alert("Error: Silakan tentukan salah satu pilihan terlebih dahulu!");
        return;
    }

    // Tampilkan step 4 (Input Email)
    pindahStep(4);
}

// LANGKAH 4: Validasi Email dengan Pattern Matching & Error Trapping
function prosesLangkah4() {
    emailUser = document.getElementById("inputEmail").value.trim();

    // Regex untuk validasi format email
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailUser)) {
        alert("Error: Format email salah! Masukkan email dengan format yang valid (contoh: nama@gmail.com).");
        document.getElementById("inputEmail").focus();
        return;
    }

    // Jika sukses, lanjut ke Langkah 5 (Output DOM)
    tampilkanHasilAkhir();
}

// LANGKAH 5: Menampilkan Hasil Akhir menggunakan JavaScript DOM
function tampilkanHasilAkhir() {
    document.getElementById("step4").style.display = "none";
    document.getElementById("step5").style.display = "block";

    let teksDaftarPilihan = arrayPilihan.join(", ");
    let hasilString = `Hallo, nama saya ${namaUser}, email ${emailUser} saya mempunyai sejumlah ${jmlPilihan} pilihan yaitu ${teksDaftarPilihan}, dan saya memilih ${pilihanTerpilih}.`;

    document.getElementById("hasilAkhir").innerText = hasilString;
}