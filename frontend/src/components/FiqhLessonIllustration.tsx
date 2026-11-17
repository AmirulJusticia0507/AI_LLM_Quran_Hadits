import Image from 'next/image';

const illustrations: Record<string, { title: string; alt: string; caption: string }> = {
  thaharah: {
    title: 'Bersuci dan kebersihan',
    alt: 'Seseorang membasuh tangan di pancuran air pada tempat wudhu yang bersih.',
    caption: 'Ilustrasi bersuci: menjaga kebersihan diri, pakaian, dan tempat ibadah.',
  },
  wudhu: {
    title: 'Wudhu',
    alt: 'Tempat wudhu dengan air mengalir, handuk bersih, dan sajadah.',
    caption: 'Ilustrasi persiapan bersuci sebelum menunaikan shalat.',
  },
  'batal-wudhu': {
    title: 'Menjaga wudhu',
    alt: 'Sajian simbolis air, jam, dan sajadah yang menggambarkan keadaan yang membatalkan wudhu.',
    caption: 'Ilustrasi pengingat untuk memahami kapan wudhu perlu diperbarui.',
  },
  mandi: {
    title: 'Mandi wajib',
    alt: 'Ruang mandi bersih dengan air mengalir, pakaian, dan handuk.',
    caption: 'Ilustrasi mandi wajib dengan memastikan air merata ke seluruh tubuh.',
  },
  tayamum: {
    title: 'Tayamum',
    alt: 'Tangan bertayamum dengan debu bersih di dekat sajadah.',
    caption: 'Ilustrasi tayamum sebagai keringanan bersuci dalam kondisi yang dibenarkan.',
  },
  shalat: {
    title: 'Shalat',
    alt: 'Seorang Muslim berdiri menghadap kiblat di atas sajadah saat matahari terbenam.',
    caption: 'Ilustrasi shalat dan ketenangan dalam beribadah.',
  },
  jamaah: {
    title: 'Shalat berjamaah',
    alt: 'Jamaah berdiri dalam saf di masjid, dengan seorang makmum baru bergabung di belakang.',
    caption: 'Ilustrasi mengikuti imam dan merapatkan saf dengan tertib.',
  },
  rukhsah: {
    title: 'Keringanan shalat',
    alt: 'Seorang musafir beristirahat di dekat sajadah dan barang bawaannya.',
    caption: 'Ilustrasi keringanan ibadah bagi orang yang sakit atau bepergian.',
  },
  puasa: {
    title: 'Puasa Ramadan',
    alt: 'Kurma dan air di atas sajadah saat senja dengan lentera menyala.',
    caption: 'Ilustrasi berbuka puasa setelah matahari terbenam.',
  },
  zakat: {
    title: 'Zakat',
    alt: 'Beras dan kurma dibagikan kepada penerima, dengan timbangan dan kantong harta sebagai simbol zakat.',
    caption: 'Ilustrasi zakat fitrah dan zakat mal sebagai ibadah dan kepedulian sosial.',
  },
  haji: {
    title: 'Haji dan umrah',
    alt: "Ka'bah tampak dari kejauhan di Masjidil Haram dengan para jamaah berpakaian ihram.",
    caption: 'Ilustrasi suasana ibadah haji dan umrah di Masjidil Haram.',
  },
  jenazah: {
    title: 'Pengurusan jenazah',
    alt: 'Keranda tertutup kain putih dengan para pelayat berdoa dari kejauhan di halaman masjid.',
    caption: 'Ilustrasi simbolis yang menjaga kehormatan jenazah dan suasana doa.',
  },
};

const english: Record<string, { title: string; alt: string; caption: string }> = {
  thaharah: { title: 'Purification and cleanliness', alt: 'A person washing their hands at a water fountain in a clean ablution area.', caption: 'An illustration of purification and keeping the body, clothing, and prayer space clean.' },
  wudhu: { title: 'Wudu', alt: 'An ablution area with flowing water, a clean towel, and a prayer mat.', caption: 'An illustration of preparing for prayer through purification.' },
  'batal-wudhu': { title: 'Maintaining wudu', alt: 'A symbolic scene with water, a clock, and a prayer mat representing situations that invalidate wudu.', caption: 'A reminder to understand when wudu needs to be renewed.' },
  mandi: { title: 'Ghusl', alt: 'A clean washroom with flowing water, clothing, and a towel.', caption: 'An illustration of ghusl, ensuring water reaches the entire body.' },
  tayamum: { title: 'Tayammum', alt: 'Hands performing tayammum with clean earth beside a prayer mat.', caption: 'An illustration of tayammum as a concession when its conditions are met.' },
  shalat: { title: 'Prayer', alt: 'A Muslim standing on a prayer mat facing the qibla at sunset.', caption: 'An illustration of prayer and calm devotion.' },
  jamaah: { title: 'Congregational prayer', alt: 'Worshippers standing in rows at a mosque as a latecomer joins at the back.', caption: 'An illustration of following the imam and joining the rows in order.' },
  rukhsah: { title: 'Prayer concessions', alt: 'A traveler resting near a prayer mat and travel bags.', caption: 'An illustration of concessions for worship when ill or traveling.' },
  puasa: { title: 'Ramadan fasting', alt: 'Dates and water on a prayer mat at dusk beside a lit lantern.', caption: 'An illustration of breaking the fast after sunset.' },
  zakat: { title: 'Zakat', alt: 'Rice and dates being shared with a recipient, with scales and a pouch symbolizing zakat.', caption: 'An illustration of zakat al-fitr and zakat on wealth as worship and social care.' },
  haji: { title: 'Hajj and Umrah', alt: 'The Kaaba seen from a distance at the Grand Mosque with pilgrims in ihram.', caption: 'An illustration of Hajj and Umrah at the Grand Mosque.' },
  jenazah: { title: 'Funeral care', alt: 'A bier fully covered in white cloth with mourners praying at a distance in a mosque courtyard.', caption: 'A symbolic illustration honoring the deceased and the atmosphere of prayer.' },
};

export default function FiqhLessonIllustration({ lessonId, english: en = false }: { lessonId: string; english?: boolean }) {
  const copy = (en ? english : illustrations)[lessonId];
  if (!copy) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-900">
      <Image
        src={`/images/ibadah/fiqh-${lessonId}.png`}
        alt={copy.alt}
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
      <figcaption className="bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100">
        <span className="font-semibold">{copy.title}.</span> {copy.caption}
      </figcaption>
    </figure>
  );
}
