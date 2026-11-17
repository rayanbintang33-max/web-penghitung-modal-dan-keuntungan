// FORMAT RUPIAH
function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// FORMAT INPUT
function ambilAngka(id) {
    return Number(document.getElementById(id).value) || 0;
}

// FUNGSI MENGHITUNG
function hitung() {
    let nama = document.getElementById("namaUsaha").value.trim();

    let modal = ambilAngka("modal");
    let biaya = ambilAngka("biaya");
    let pendapatan = ambilAngka("pendapatan");

    if (nama === "") {
        alert("Silakan masukkan nama usaha!");
        return;
    }

    if (
        modal < 0 ||
        biaya < 0 ||
        pendapatan < 0
    ) {
        alert("Nilai keuangan tidak boleh negatif!");
        return;
    }

    if (
        !document.getElementById("modal").value ||
        !document.getElementById("pendapatan").value
    ) {
        alert("Silakan isi modal dan pendapatan!");
        return;
    }

    // TOTAL MODAL
    let totalModal = modal + biaya;

    // KEUNTUNGAN BERSIH
    let keuntungan = pendapatan - totalModal;

    // PERSENTASE KEUNTUNGAN DARI MODAL
    let margin = totalModal > 0
        ? (keuntungan / totalModal) * 100
        : 0;

    // STATUS
    let status = "Impas";

    if (keuntungan > 0) {
        status = "Untung";
    } else if (keuntungan < 0) {
        status = "Rugi";
    }

    // UPDATE DASHBOARD
    document.getElementById("cardModal").innerText = rupiah(totalModal);
    document.getElementById("cardPendapatan").innerText = rupiah(pendapatan);
    document.getElementById("cardUntung").innerText = rupiah(keuntungan);

    // UPDATE HASIL
    document.getElementById("hasilUntung").innerText = rupiah(keuntungan);
    document.getElementById("hasilModal").innerText = rupiah(totalModal);
    document.getElementById("hasilPendapatan").innerText = rupiah(pendapatan);
    document.getElementById("margin").innerText = margin.toFixed(2) + "%";
    document.getElementById("persentase").innerText = margin.toFixed(2) + "%";
    document.getElementById("statusHasil").innerText = status;
    document.getElementById("kondisi").innerText = status;

    // WARNA KEUNTUNGAN
    let warna = keuntungan < 0 ? "#ff7777" : "#69e5a9";

    document.getElementById("hasilUntung").style.color = warna;
    document.getElementById("cardUntung").style.color = warna;
    document.getElementById("kondisi").style.color = warna;

    // GRAFIK
    let nilaiTerbesar = Math.max(
        totalModal,
        pendapatan,
        Math.abs(keuntungan),
        1
    );

    function tinggi(nilai) {
        return Math.max(
            5,
            (nilai / nilaiTerbesar) * 130
        );
    }

    document.getElementById("barModal").style.height = tinggi(totalModal) + "px";
    document.getElementById("barPendapatan").style.height = tinggi(pendapatan) + "px";
    document.getElementById("barUntung").style.height = tinggi(Math.abs(keuntungan)) + "px";

    // SIMPAN RIWAYAT
    let tabel = document.getElementById("riwayatData");

    if (tabel.querySelector("td[colspan]")) {
        tabel.innerHTML = "";
    }

    let baris = tabel.insertRow(0);

    baris.innerHTML = `
        <td>${nama.replace(/[&<>"']/g, "")}</td>
        <td>${rupiah(totalModal)}</td>
        <td>${rupiah(pendapatan)}</td>
        <td style="color:${warna}">
            ${rupiah(keuntungan)}
        </td>
        <td>${status}</td>
    `;

    // PINDAH KE HASIL
    document.getElementById("hasil").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// RESET
function resetData() {
    let konfirmasi = confirm(
        "Apakah Anda yakin ingin menghapus semua data?"
    );

    if (!konfirmasi) return;

    document.getElementById("namaUsaha").value = "";
    document.getElementById("modal").value = "";
    document.getElementById("biaya").value = "";
    document.getElementById("pendapatan").value = "";

    document.getElementById("cardModal").innerText = "Rp0";
    document.getElementById("cardPendapatan").innerText = "Rp0";
    document.getElementById("cardUntung").innerText = "Rp0";

    document.getElementById("hasilUntung").innerText = "Rp0";
    document.getElementById("hasilModal").innerText = "Rp0";
    document.getElementById("hasilPendapatan").innerText = "Rp0";

    document.getElementById("margin").innerText = "0%";
    document.getElementById("persentase").innerText = "0%";
    document.getElementById("statusHasil").innerText = "Belum dihitung";
    document.getElementById("kondisi").innerText = "Menunggu Data";

    document.getElementById("hasilUntung").style.color = "#69e5a9";
    document.getElementById("cardUntung").style.color = "#69e5a9";
    document.getElementById("kondisi").style.color = "#d58ae5";

    document.getElementById("riwayatData").innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center">
                Belum ada riwayat perhitungan.
            </td>
        </tr>
    `;

    document.getElementById("barModal").style.height = "5px";
    document.getElementById("barPendapatan").style.height = "5px";
    document.getElementById("barUntung").style.height = "5px";
}