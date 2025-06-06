import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SectionContainer } from "../../../layouts/Section";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { CiBullhorn } from "react-icons/ci";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ReportImages from "../components/ReportImages";
import { NotFound } from "../../../404NotFound";

import loadingGif from "../../../assets/videos/loading.webm";

// Definisikan tipe data untuk laporan yang akan ditampilkan
interface Report {
  namaPelapor: string;
  namaPinjol: string;
  deskripsiMasalah: string;
  buktiMasalah: string; // URL gambar bukti masalah (optional)
  tanggalLaporan: string;
}

export const DetailedReport = () => {
  const { reportId } = useParams(); // Mengambil ID dari URL
  console.log(reportId);
  const [report, setReport] = useState<Report | null>(null); // Menambahkan tipe data `Report`
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.sheetbest.com/sheets/0b3a6b09-a17c-4383-b8ca-3329cc59d58c`
        );

        const reportData = response.data.find(
          (item: any) => item.idLaporan === reportId
        );

        if (reportData) {
          setReport(reportData);
        } else {
          console.error("Report not found!");
          setReport(null);
        }

        console.log(reportData);
      } catch (error) {
        console.error("Error fetching report details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReportDetail();
    }
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-[243px]">
        <video
          src={loadingGif}
          autoPlay
          loop
          muted
          playsInline
          className="w-40 h-40"
        />
      </div>
    );
  }

  if (!report) {
    return <NotFound />;
  }

  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] pt-4 pb-28 md:pb-4 lg:max-w-screen-md"
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center gap-x-4 p-2">
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              alt="Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center p-0 justify-start -space-y-1.5">
            <div className="flex">
              <h1 className="text-md">{report.namaPelapor}</h1>
              <CiBullhorn className="-rotate-12 text-primary font-bold" />
            </div>
            <p className="text-xs self-start text-primary">Pelapor</p>
          </div>
        </div>
        <div>
          <h1 className="italic">
            Telah Melaporkan {report.namaPinjol} Sebagai Pinjol Yang Kurang
            Aman, dan dia berkata :
          </h1>
        </div>
        <div className="border-l-2 ml-0">
          <p className="pl-2 text-justify">{report.deskripsiMasalah}</p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-md self-start">Bukti Terkait Kasus : </h1>
          <div>
            <ReportImages buktiMasalah={report.buktiMasalah} />
          </div>
          <p className="text-center italic text-sm">
            Terima kasih atas kepedulian Anda dalam melaporkan layanan pinjaman
            online ilegal. Tindakan ini sangat membantu dalam mencegah penipuan
            dan melindungi masyarakat dari kerugian. Semoga langkah ini
            menginspirasi lebih banyak orang untuk berani melawan kejahatan
            digital demi keamanan bersama.
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <MdOutlineArrowBackIos className="text-primary" />
            <Link to="/search" onClick={() => window.history.back()}>
              <h1 className="text-xs text-secondary">Kembali</h1>
            </Link>
          </div>
          <h1 className="text-xs text-secondary">{report.tanggalLaporan}</h1>
        </div>
      </div>
    </SectionContainer>
  );
};
