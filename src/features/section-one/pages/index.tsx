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

      <div className="grid grid-cols-2 gap-6">
        {/* Kotak 1 */}
        <div className="flex flex-col bg-white border-2 border-[#15375B] shadow-xl p-4 rounded-xl w-40">
          <h1 className="text-md font-semibold text-[#15375B] mb-2">
            1. Lewat Telepon
          </h1>
          <p className="text-sm font-light text-[#15375B]">
            Hubungi no 157
            <br />
            (08.00–17.00 WIB)
          </p>
        </div>

        {/* Kotak 2 */}
        <div className="flex flex-col bg-white border-2 border-[#15375B] shadow-xl p-4 rounded-xl w-40">
          <h1 className="text-md font-semibold text-[#15375B] mb-2">
            2. Lewat WA
          </h1>
          <p className="text-sm font-light text-[#15375B]">
            081-157-157-157
            <br />
            Chat only
          </p>
        </div>

        {/* Kotak 3 */}
        <div className="flex flex-col bg-white border-2 border-[#15375B] shadow-xl p-4 rounded-xl w-40">
          <h1 className="text-md font-semibold text-[#15375B] mb-2">
            3. Lewat Email
          </h1>
          <p className="text-sm font-light text-[#15375B]">
            konsumen@ojk.go.id
            <br />
            Kirim seluruh foto bukti terkait pinjol illegal
          </p>
        </div>

        {/* Kotak 4 */}
        <div className="flex flex-col bg-white border-2 border-[#15375B] shadow-xl p-4 rounded-xl w-40">
          <h1 className="text-md font-semibold text-[#15375B] mb-2">
            4 . Lewat APPK OJK
          </h1>
          <p className="text-sm font-light text-[#15375B] break-words">
            <a
              href="https://konsumen.ojk.go.id/"
              className="underline text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://konsumen.ojk.go.id/
            </a>
            <br />
            Atau unduh APPK OJK
          </p>
        </div>
      </div>

      <ReportLink />
      <Risk />
    </SectionContainer>
  );
};

export default FirstSection;
