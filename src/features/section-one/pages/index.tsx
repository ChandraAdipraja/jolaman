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
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center space-y-20 pt-20 pb-30"
    >
      <Welcome />
      <Introduction />
      <TypeOnlineLoan />
      <Recomendations />

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center border-2 border-[#15375B] rounded-xl p-6 h-48 text-center shadow-sm">
          <p className="text-[#15375B] text-sm font-medium mb-4">
            1. Lewat Telepon
            <br />
            Hubungi nomor 157 (08.00–17.00 WIB)
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-[#15375B] rounded-xl p-6 text-center shadow-sm">
          <p className="text-[#15375B] text-lg font-medium mb-4">
            2. Lewat WhatsApp
            <br />
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-[#15375B] rounded-xl p-6 text-center shadow-sm">
          <p className="text-[#15375B] text-lg font-medium mb-4">
            Pernah Melihat Sebuah
            <br />
            Website Pinjaman Online
            <br />
            Mencurigakan? Report
            <br />
            Disini
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-[#15375B] rounded-xl p-6 text-center shadow-sm">
          <p className="text-[#15375B] text-lg font-medium mb-4">
            Pernah Melihat Sebuah
            <br />
            Website Pinjaman Online
            <br />
            Mencurigakan? Report
            <br />
            Disini
          </p>
        </div>
      </div>

      <ReportLink />
      <Risk />
    </SectionContainer>
  );
};

export default FirstSection;
