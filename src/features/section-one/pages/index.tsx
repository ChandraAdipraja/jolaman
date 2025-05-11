import { SectionContainer } from "../../../layouts/Section";
import { Recomendations } from "../components/Recomendations";

import { Welcome } from "../components/Welcome";
import { Introduction } from "../components/Introduction";
import { TypeOnlineLoan } from "../components/TypeOnlineLoan";
import { ReportLink } from "../components/ReportLink";
import { Risk } from "../components/Risk";

const FirstSection = () => {
  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center space-y-20 pt-20 pb-30 md:pb-0"
    >
      <Welcome />
      <Introduction />
      <TypeOnlineLoan />
      <Recomendations />
      <div className="px-4 pb-4">
        <h1 className="text-xl md:text-3xl font-bold text-black mb-4">
          Cara Melaporkan Pinjol Illegal
        </h1>

        <ul className="space-y-4 text-sm md:text-base text-black">
          <li>
            <span className="font-semibold before:content-['•'] before:mr-2 before:text-black">
              Melalui Telepon
            </span>
            <div className="pl-5 mt-1 italic">
              Hubungi layanan OJK di nomor 157 (hari kerja, pukul 08.00–17.00
              WIB).
            </div>
          </li>

          <li>
            <span className="font-semibold before:content-['•'] before:mr-2 before:text-black">
              Melalui WhatsApp (WA)
            </span>
            <div className="pl-5 mt-1 italic">
              Kirim pesan ke nomor 081-157-157-157 dengan menyertakan informasi
              pinjol ilegal yang ingin dilaporkan.
            </div>
          </li>

          <li>
            <span className="font-semibold before:content-['•'] before:mr-2 before:text-black">
              Melalui Email
            </span>
            <div className="pl-5 mt-1 italic">
              Kirim laporan lengkap ke alamat email:{" "}
              <a
                href="mailto:konsumen@ojk.go.id"
                className="underline text-blue-600"
              >
                konsumen@ojk.go.id
              </a>
              <br />
              Sertakan nama aplikasi, tangkapan layar, dan kronologi kejadian.
            </div>
          </li>

          <li>
            <span className="font-semibold before:content-['•'] before:mr-2 before:text-black">
              Melalui Aplikasi OJK (OJK Mobile Apps)
            </span>
            <div className="pl-5 mt-1 italic">
              Unduh aplikasi OJK Mobile melalui Play Store atau App Store, lalu
              pilih menu pengaduan konsumen dan ikuti langkah-langkah pelaporan.
            </div>
          </li>
        </ul>
      </div>

      <div className="flex justify-center items-center mt-0">
        <div className="grid grid-cols-2 grid-rows-2 w-80 h-70 border-2 border-[#15375B] rounded-xl overflow-hidden">
          <div className="border-b-2 border-r-2 border-[#15375B]"></div>
          <div className="border-b-2 border-[#15375B]"></div>
          <div className="border-r-2 border-[#15375B]"></div>
        </div>
      </div>

      <ReportLink />
      <Risk />
    </SectionContainer>
  );
};

export default FirstSection;
