// Fungsi untuk menghitung koordinat berdasarkan kolom dan baris
module.exports = (kolom, baris) => {
  const barisHeight = 1000 / 10; // Tinggi per baris dalam piksel
  const kolomWidth = 2700 / 27; // Lebar per kolom dalam piksel

  // Konversi huruf baris menjadi indeks numerik (A = 1, B = 2, ..., J = 10)
  const barisIndex = baris.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

  // Konversi kolom menjadi indeks numerik (01 = 1, 02 = 2, ..., 27 = 27)
  const kolomIndex = parseInt(kolom, 10);

  // Hitung koordinat x dan y untuk tengah cell
  const x = 2700 - (kolomIndex - 1) * kolomWidth - kolomWidth / 2; // Kolom dibalik: 1 di kanan, 27 di kiri
  const y = (barisIndex - 1) * barisHeight + barisHeight / 2; // Baris menentukan Y

  // Kembalikan null jika koordinat berada di luar batas
  if (barisIndex < 1 || barisIndex > 10 || kolomIndex < 1 || kolomIndex > 27) {
    return null;
  }

  return { x, y };
};
