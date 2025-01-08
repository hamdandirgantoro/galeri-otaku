import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const About = () => {
  return (
    <main className="min-h-screen max-w-full bg-gray-400 font-akira p-2 text-slate-900">
      <h1 className="text-2xl font-semibold mb-4">Tentang Galeri Otaku</h1>
      <p className="mb-4">
        Galeri Otaku adalah situs web yang didedikasikan untuk menampilkan
        berbagai manga (komik Jepang) bagi penggemar dari segala usia. Apakah
        Anda seorang penggemar manga lama atau pendatang baru, Anda akan
        menemukan informasi detail dan tautan untuk menjelajahi beberapa seri
        paling populer dan tercinta dari Jepang.
      </p>
      <h2 className="text-xl font-semibold mb-2">Layanan Pelanggan</h2>
      <p>
        Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu
        untuk menghubungi tim layanan pelanggan kami:
      </p>
      <ul>
        <li className="flex">
          <div className="flex gap-1">
            <EnvelopeIcon height={20} />
            Email:{" "}
          </div>
          <a href="mailto:support@galeriotaku.com" className="text-blue-600">
            support@galeriotaku.com
          </a>
        </li>
        <li className="flex">
          <div className="flex gap-1">
            <PhoneIcon height={20} />
            Telepon:{" "}
          </div>
          <a href="tel:+6281234567890" className="text-blue-600">
            +62 812 3456 7890
          </a>
        </li>
      </ul>
    </main>
  );
};

export default About;
