import { SectionContainer } from "../../../layouts/Section";
import { Recomendations } from "../components/Recomendations";
import { Welcome } from "../components/Welcome";
import { Introduction } from "../components/Introduction";
import { TypeOnlineLoan } from "../components/TypeOnlineLoan";
import { ReportLink } from "../components/ReportLink";
import { Risk } from "../components/Risk";
import { IoIosCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import FaQ from "../components/FaQ";

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
      <div className="px-4">
        <h1 className="text-2xl md:text-5xl font-semibold text-secondary text-center mb-1">
          Cara Melaporkan Pinjol Ilegal
        </h1>
        <p className="text-xs md:text-sm font-semibold text-muted-foreground text-center mb-4">
          Beberapa cara melaporkan pinjol ilegal kepada OJK
        </p>

        <div className="space-y-4">
          {/* Telepon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telepon */}
            <div className="relative overflow-hidden bg-white shadow-2xl rounded-2xl p-6 md:p-5 w-full min-h-[120px] md:w-[450px] md:h-[100px]">
              <div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm pointer-events-none z-0 rounded-2xl"></div>
              <div className="relative z-10">
                <p className="font-semibold text-base leading-snug flex items-center gap-x-1">
                  Melalui Telepon
                  <MdOutlineVerified className="text-base text-secondary" />
                </p>
                <p className="text-sm italic mt-2">
                  Hubungi layanan OJK di nomor{" "}
                  <span className="font-semibold">157</span>.{" "}
                  <span className="block">
                    (hari kerja, pukul 08.00–17.00 WIB)
                  </span>
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="relative overflow-hidden bg-white shadow-2xl rounded-2xl p-6 md:p-5 w-full min-h-[120px] md:w-[460px] md:h-[100px]">
              <div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm pointer-events-none z-0 rounded-2xl" />
              <div className="relative z-10">
                <p className="font-semibold text-base leading-snug flex items-center gap-x-1">
                  Melalui WhatsApp (WA)
                  <MdOutlineVerified className="text-base text-secondary" />
                </p>
                <p className="text-sm italic mt-2">
                  Kirim pesan ke{" "}
                  <span className="font-semibold">081-157-157-157</span>
                </p>
                <p className="text-sm italic">
                  Sertakan informasi pinjol ilegal yang ingin dilaporkan
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="relative overflow-hidden bg-white shadow-2xl rounded-2xl p-6 md:p-5 w-full min-h-[120px] md:w-[450px] md:h-[100px]">
              <div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm pointer-events-none z-0 rounded-2xl" />
              <div className="relative z-10">
                <p className="font-semibold text-base leading-snug flex items-center gap-x-1">
                  Melalui Email
                  <MdOutlineVerified className="text-base text-secondary" />
                </p>
                <p className="text-sm italic mt-2">
                  Kirim ke{" "}
                  <span className="font-semibold">konsumen@ojk.go.id</span>.
                  Sertakan nama aplikasi, screenshot, dan kronologi kejadian.
                </p>
              </div>
            </div>

            {/* Website */}
            <div className="relative overflow-hidden bg-white shadow-2xl rounded-2xl p-6 md:p-4 w-full min-h-[120px] md:w-[460px] md:h-[100px]">
              <div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm pointer-events-none z-0 rounded-2xl" />
              <div className="relative z-10">
                <p className="font-semibold text-base leading-snug flex items-center gap-x-1">
                  Melalui Website OJK
                  <MdOutlineVerified className="text-base text-secondary" />
                </p>
                <p className="text-sm italic mt-2 md:hidden">
                  Kunjungi <span className="font-semibold">www.ojk.go.id</span>.
                  Anda bisa mencari form pengaduan yang biasanya tersedia di
                  bagian "Kontak157". Isi formulir dengan data yang diminta,
                  termasuk detail pinjol ilegal yang ingin Anda laporkan.
                </p>

                {/* Teks ringkas untuk desktop */}
                <p className="text-sm italic mt-2 hidden md:block">
                  Kunjungi <span className="font-semibold">www.ojk.go.id</span>{" "}
                  Anda bisa mencari form pengaduan yang tersedia di bagian
                  "Kontak157". Isi formulir dengan data yang diminta, termasuk
                  detail pinjol yang dilaporkan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-80 h-72 md:w-[920px] md:h-[200px] border border-[#15375B] md:border-0 bg-white relative p-6 rounded-2xl md:shadow-2xl overflow-hidden md:gap-2">
            {/* Kotak 1 */}
            <div className="group border-b border-r border-[#15375B] md:border-b-0 md:border-r transition-all duration-300 cursor-pointer flex items-center justify-center">
              <a
                href="tel:157"
                className="w-full h-full flex items-center justify-center mb-4 md:mb-0 mr-5 md:mr-0"
              >
                <IoIosCall className="text-6xl md:text-7xl text-secondary group-hover:scale-110 group-hover:text-primary transition-all duration-300 ease-in-out" />
              </a>
            </div>

            {/* Kotak 2 */}
            <div className="group border-b border-[#15375B] md:border-b-0 md:border-r transition-all duration-300 cursor-pointer flex items-center justify-center">
              <a
                href="https://wa.me/6281157157157"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center mb-4 md:mb-0 ml-5 md:ml-0"
              >
                <FaWhatsapp className="text-7xl md:text-8xl text-secondary group-hover:scale-110 group-hover:text-primary transition-all duration-300 ease-in-out" />
              </a>
            </div>

            {/* Kotak 3 */}
            <div className="group border-r border-[#15375B] md:border-r transition-all duration-300 cursor-pointer flex items-center justify-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=konsumen@ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center mt-3 md:mt-0 mr-5 md:mr-0"
              >
                <BiLogoGmail className="text-7xl md:text-8xl text-secondary group-hover:scale-110 group-hover:text-primary transition-all duration-300 ease-in-out" />
              </a>
            </div>

            {/* Kotak 4 */}
            <div className="group transition-all duration-300 cursor-pointer flex items-center justify-center">
              <a
                href="https://kontak157.ojk.go.id/appkpublicportal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center mt-4 md:mt-0 ml-5 md:ml-0"
              >
                <FaGlobe className="text-7xl md:text-8xl text-secondary group-hover:scale-110 group-hover:text-primary transition-all duration-300 ease-in-out" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ReportLink />
      <Risk />
      <FaQ />
    </SectionContainer>
  );
};

export default FirstSection;
