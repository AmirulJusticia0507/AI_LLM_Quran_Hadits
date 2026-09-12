import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Meneladani Wudhu dan Shalat Nabi", description: "Panduan urutan wudhu dan shalat dengan ilustrasi, bacaan, dan rujukan hadits." };

const wudhu = [
  ["Persiapan dan niat", "Gunakan air suci dan menyucikan. Hilangkan penghalang air seperti cat pada kulit. Niatkan bersuci dalam hati; tidak ada lafaz niat tertentu yang harus diucapkan. Mulailah dengan menyebut nama Allah."],
  ["Membasuh kedua telapak tangan", "Basuh kedua telapak tangan hingga pergelangan, termasuk sela jari, tiga kali."],
  ["Berkumur dan membersihkan hidung", "Berkumur, masukkan air ke hidung dengan lembut lalu keluarkan. Lakukan tiga kali. Saat berpuasa jangan berlebihan memasukkan air ke hidung."],
  ["Membasuh wajah", "Basuh seluruh wajah dari batas tumbuh rambut sampai dagu dan dari telinga ke telinga, tiga kali. Pastikan air mencapai bagian yang wajib dibasuh."],
  ["Membasuh tangan sampai siku", "Basuh tangan kanan hingga siku, termasuk siku, lalu tangan kiri. Masing-masing tiga kali; ratakan air pada sela jari."],
  ["Mengusap kepala dan telinga", "Dengan tangan basah, usap kepala dari depan ke belakang lalu kembali ke depan. Usap bagian dalam dan luar telinga. Mengusap berbeda dari membasuh; cukup sekali."],
  ["Membasuh kaki sampai mata kaki", "Basuh kaki kanan lalu kiri, masing-masing tiga kali. Sertakan kedua mata kaki, tumit, serta sela jari; jangan menyisakan bagian yang kering."],
  ["Selesai dan berdoa", "Kerjakan berurutan dan berkesinambungan. Baca syahadat setelah wudhu. Tiga kali adalah bentuk yang dicontohkan di panduan ini; membasuh sekali secara merata juga memiliki dasar riwayat. Jangan boros air."],
] as const;

const shalat = [
  ["Persiapan", "Pastikan sudah masuk waktu, suci dari hadats dan najis, aurat tertutup, serta menghadap kiblat. Niat dalam hati sesuai shalat yang dikerjakan. Berdiri jika mampu; orang yang tidak mampu memiliki keringanan."],
  ["Takbiratul ihram", "Ucapkan Allahu akbar sambil mengangkat kedua tangan sejajar bahu atau telinga, lalu letakkan tangan kanan di atas tangan kiri. Pandangan diarahkan ke tempat sujud."],
  ["Berdiri dan membaca", "Baca doa iftitah yang diajarkan, taawudz, kemudian Al-Fatihah. Pada dua rakaat pertama, lanjutkan surat atau ayat yang dihafal. Bacaan makmum dan cara mengeraskan basmalah memiliki rincian fiqih."],
  ["Rukuk", "Bertakbir menuju rukuk. Letakkan telapak tangan pada lutut, ratakan punggung, dan sejajarkan kepala dengan punggung. Tenang sejenak (tuma’ninah), lalu baca tasbih rukuk."],
  ["Iktidal", "Bangkit sampai berdiri tegak. Imam atau orang yang shalat sendiri membaca Sami‘allahu liman hamidah; baca Rabbana wa lakal-hamd saat tegak. Makmum membaca pujian tersebut. Jangan langsung turun sebelum tenang."],
  ["Sujud pertama", "Bertakbir lalu sujud pada tujuh anggota: dahi bersama hidung, kedua telapak tangan, kedua lutut, dan ujung jari kedua kaki. Angkat lengan dari lantai. Baca tasbih sujud dengan tuma’ninah."],
  ["Duduk di antara dua sujud", "Bertakbir dan duduk dengan tenang. Salah satu bentuknya adalah duduk di atas kaki kiri dengan kaki kanan ditegakkan. Baca Rabbighfir li."],
  ["Sujud kedua", "Bertakbir dan sujud kembali dengan tuma’ninah. Satu rakaat mencakup dua sujud. Sesudahnya bangkit untuk rakaat berikutnya dengan takbir."],
  ["Rakaat berikutnya", "Ulangi berdiri, membaca Al-Fatihah, rukuk, iktidal, dua sujud, dan duduk di antaranya. Shalat Subuh dua rakaat, Maghrib tiga, serta Zuhur, Ashar, dan Isya empat pada keadaan biasa tanpa qashar."],
  ["Tasyahud awal", "Pada shalat tiga atau empat rakaat, duduk setelah rakaat kedua dan baca tasyahud, kemudian bangkit melanjutkan rakaat. Pada shalat dua rakaat, duduk ini menjadi tasyahud akhir."],
  ["Tasyahud akhir dan doa", "Pada rakaat terakhir, duduk membaca tasyahud dan shalawat kepada Nabi, lalu berdoa sebelum salam. Bentuk duduk iftirasy/tawarruk dan gerakan telunjuk memiliki rincian serta perbedaan penjelasan ulama."],
  ["Salam", "Akhiri dengan mengucapkan Assalamu ‘alaikum wa rahmatullah sambil menoleh ke kanan, lalu ke kiri. Setelah selesai, lanjutkan dzikir setelah shalat."],
] as const;

const bacaan = [
  { title: "Syahadat setelah wudhu", arab: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا عَبْدُ اللَّهِ وَرَسُولُهُ", arti: "Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah dan Muhammad adalah hamba serta utusan-Nya." },
  { title: "Takbir", arab: "اللَّهُ أَكْبَرُ", arti: "Allah Mahabesar." },
  { title: "Tasbih rukuk", arab: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", arti: "Mahasuci Tuhanku Yang Mahaagung." },
  { title: "Iktidal", arab: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ", arti: "Allah mendengar orang yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala puji." },
  { title: "Tasbih sujud", arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى", arti: "Mahasuci Tuhanku Yang Mahatinggi." },
  { title: "Di antara dua sujud", arab: "رَبِّ اغْفِرْ لِي", arti: "Wahai Tuhanku, ampunilah aku." },
  { title: "Tasyahud (riwayat Ibnu Mas‘ud)", arab: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", arti: "Segala penghormatan, doa, dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat Allah, dan keberkahan-Nya tercurah kepadamu, wahai Nabi. Semoga keselamatan atas kami dan hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah dan Muhammad adalah hamba serta utusan-Nya." },
  { title: "Shalawat Ibrahimiyah", arab: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", arti: "Ya Allah, limpahkan shalawat dan keberkahan kepada Muhammad serta keluarga Muhammad, sebagaimana kepada keluarga Ibrahim. Sungguh Engkau Maha Terpuji lagi Mahamulia." },
  { title: "Salam", arab: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", arti: "Semoga keselamatan dan rahmat Allah tercurah kepada kalian." },
];

function Steps({ items }: Readonly<{ items: ReadonlyArray<readonly [string, string]> }>) {
  return <ol className="space-y-4">{items.map(([title, detail], index) => <li key={title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold text-lg">{index + 1}. {title}</h3><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{detail}</p></li>)}</ol>;
}

export default function PraktikIbadahPage() {
  return <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
    <header className="rounded-3xl bg-emerald-900 p-7 text-white space-y-3"><p>Panduan praktik ibadah</p><h1 className="text-3xl font-bold">Meneladani Wudhu dan Shalat Nabi ﷺ</h1><p className="leading-7">Pelajari persiapan, urutan gerakan, bacaan, dan rujukan untuk membiasakan ibadah dengan tenang.</p></header>
    <nav aria-label="Bagian panduan" className="flex flex-wrap gap-4 text-emerald-700 dark:text-emerald-300 underline"><a href="#wudhu">Urutan wudhu</a><a href="#shalat">Urutan shalat</a><a href="#bacaan">Bacaan</a><a href="#rujukan">Rujukan</a></nav>
    <figure className="space-y-3"><a href="/images/ibadah/wudhu-shalat.png" target="_blank" rel="noopener noreferrer"><Image src="/images/ibadah/wudhu-shalat.png" width={1536} height={1024} alt="Gambaran membasuh tangan, wajah, lengan dan kaki; serta berdiri, rukuk, sujud dan duduk dalam shalat." className="w-full h-auto rounded-2xl" /></a><figcaption className="text-sm leading-6 text-slate-500">Ilustrasi AI seorang peraga masa kini, bukan penggambaran Nabi. Gambar hanya gambaran beberapa gerakan, bukan seluruh urutan; ikuti langkah tertulis di bawah. Ketuk untuk memperbesar.</figcaption></figure>
    <p className="leading-7">Panduan ini untuk praktik dasar dalam keadaan biasa. Detail sunnah, rukun, dan variasi bacaan memiliki pembahasan mazhab; pelajari bersama guru. Tuma’ninah berarti berhenti dengan tenang pada posisi gerakan, bukan bergerak tergesa-gesa.</p>
    <section id="wudhu" className="scroll-mt-24 space-y-4"><h2 className="text-2xl font-bold">Urutan wudhu</h2><Steps items={wudhu} /><p className="text-sm">Wudhu perlu diulang ketika batal, misalnya setelah buang air atau keluar angin. Kondisi luka, penggunaan perban, dan tayamum memerlukan panduan tersendiri.</p></section>
    <section id="shalat" className="scroll-mt-24 space-y-4"><h2 className="text-2xl font-bold">Urutan shalat</h2><Steps items={shalat} /><Link href="/dzikir" className="block text-emerald-700 dark:text-emerald-300 underline">Lanjut ke dzikir setelah shalat →</Link></section>
    <section id="bacaan" className="scroll-mt-24 space-y-4"><h2 className="text-2xl font-bold">Bacaan pendamping</h2><Link href="/quran" className="block underline text-emerald-700 dark:text-emerald-300">Buka Al-Qur’an untuk membaca Al-Fatihah dan surat lainnya</Link>{bacaan.map(item => <details key={item.title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"><summary className="cursor-pointer font-semibold">{item.title}</summary><p lang="ar" dir="rtl" className="arabic-text my-5">{item.arab}</p><p className="leading-7">{item.arti}</p></details>)}</section>
    <section id="rujukan" className="scroll-mt-24 space-y-3"><h2 className="text-2xl font-bold">Rujukan untuk dipelajari</h2><ul className="list-disc pl-6 space-y-2">{[
      ["bukhari:159", "Wudhu Utsman yang mencontoh wudhu Nabi"], ["bukhari:185", "Mengusap kepala dari depan ke belakang dan kembali"], ["bukhari:157", "Membasuh anggota wudhu sekali"], ["muslim:234a", "Syahadat setelah wudhu"], ["bukhari:631", "Mencontoh shalat Nabi"], ["bukhari:757", "Urutan gerakan dan tuma’ninah"], ["bukhari:812", "Tujuh anggota sujud"], ["muslim:772", "Tasbih rukuk dan sujud"], ["muslim:402a", "Bacaan tasyahud"], ["bukhari:6357", "Shalawat kepada Nabi"],
    ].map(([id, title]) => <li key={id}><a className="underline text-emerald-700 dark:text-emerald-300" href={`https://sunnah.com/${id}`} target="_blank" rel="noopener noreferrer">{title} ({id})</a></li>)}</ul><Link href="/fiqh" className="block underline">Pelajari Fiqh Ibadah lebih lanjut →</Link></section>
  </div>;
}
