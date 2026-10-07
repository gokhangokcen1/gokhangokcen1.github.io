/* =========================================================
   BLOG MANIFESTO — tek kaynak.
   Yeni bölüm = buraya 1 satır + 1 HTML dosyası.
   slug  : dosya adı (.html olmadan), seri içinde benzersiz
   t / e : başlık TR / EN (e opsiyonel)
   date  : "YYYY-MM-DD" (opsiyonel, yazıda tarih olarak görünür)
   draft : true iken "taslak" rozeti çıkar; bitince satırdan sil
   Sıra = gezinme sırası (Önceki / Sonraki bu sıraya göre çalışır)
   ========================================================= */
window.BLOG = {
  series: [
    {
      id: "kirat-os",
      path: "kirat-os",
      title: { tr: "KIRAT-OS Notları", en: "KIRAT-OS Notes" },
      desc: {
        tr: "KIRAT-OS sürecinde Nand2Tetris ve Ben Eater ile bilgisayarın çalışma prensipleri ve oluşturulması.",
        en: "Everything I learned with Nand2Tetris and Ben Eater along the KIRAT-OS journey."
      },
      groups: [
        {
          id: "nand2tetris",
          title: { tr: "Nand2Tetris", en: "Nand2Tetris" },
          chapters: [
            { slug: "proje-01-boolean-logic", t: "Proje 1 — Boolean Mantık", e: "Project 1 — Boolean Logic", draft: true },
            { slug: "proje-02-boolean-arithmetic", t: "Proje 2 — Boolean Aritmetik", e: "Project 2 — Boolean Arithmetic", draft: true },
            { slug: "proje-03-memory", t: "Proje 3 — Bellek", e: "Project 3 — Memory", draft: true }
          ]
        },
        {
          id: "ben-eater",
          title: { tr: "Ben Eater", en: "Ben Eater" },
          chapters: [
            { slug: "01-clock", t: "01 — Clock modülü", e: "01 — Clock module", draft: true },
            { slug: "02-registers", t: "02 — Register'lar", e: "02 — Registers", draft: true },
            { slug: "03-alu", t: "03 — ALU", e: "03 — ALU", draft: true }
          ]
        }
      ]
    },
    {
      id: "esp32",
      path: "esp32",
      title: { tr: "ESP32 Notları", en: "ESP32 Notes" },
      desc: {
        tr: "ESP32 ve ESP-IDF öğrenirken tuttuğum notlar: mimari, çevre birimleri, FreeRTOS ve ötesi.",
        en: "Notes while learning ESP32 and ESP-IDF: architecture, peripherals, FreeRTOS and beyond."
      },
      groups: [
        {
          id: "temeller",
          title: { tr: "Temeller", en: "Fundamentals" },
          chapters: [
            { slug: "01-mimari-ve-arac-zinciri", t: "Mimari ve araç zinciri", e: "Architecture and toolchain", draft: true },
            { slug: "02-gpio", t: "GPIO", e: "GPIO", draft: true },
            { slug: "03-freertos-gorevleri", t: "FreeRTOS görevleri", e: "FreeRTOS tasks", draft: true }
          ]
        },
        {
          id: "cevre-birimleri",
          title: { tr: "Çevre birimleri", en: "Peripherals" },
          chapters: [
            { slug: "04-adc", t: "ADC", e: "ADC", draft: true }
          ]
        }
      ]
    }
  ]
};
