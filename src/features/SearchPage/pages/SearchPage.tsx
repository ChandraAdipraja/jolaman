import { useEffect, useState } from "react";
import axios from "axios";
import { SectionContainer } from "../../../layouts/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import notFoundImage from "../../../assets/img/notfound.png";
import defaultImage from "../../../assets/img/result.png";
import loadingGif from "../../../assets/videos/loading.webm";

export const SearchPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const apiUrl =
      "https://api.sheetbest.com/sheets/0b3a6b09-a17c-4383-b8ca-3329cc59d58c";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setReports(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
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

  const filteredReports = reports.filter((report) => {
    const statusTrue = String(report.statusLaporan).toLowerCase() === "true";
    const matchesSearch = report.namaPinjol
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusTrue && matchesSearch;
  });

  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-start pt-10 space-y-5 lg:max-w-screen-md"
    >
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Cari Nama Pinjol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md border-secondary"
        />
      </div>

      {searchTerm === "" && (
        <img
          src={defaultImage}
          alt="start searching"
          width={500}
          className="mx-auto opacity-70"
        />
      )}

      {/* List Card */}
      {searchTerm !== "" && filteredReports.length > 0 && (
        <>
          {filteredReports.map((report) => (
            <Card key={report.idLaporan}>
              <CardHeader className="gap-0 flex items-center justify-between">
                <div>
                  <CardTitle>{report.namaPinjol}</CardTitle>
                  <CardDescription>
                    Report By : {report.namaPelapor}
                  </CardDescription>
                </div>
                <div className="p-2 bg-red-50 text-red-500 rounded-4xl text-sm">
                  <p>Danger</p>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col text-justify gap-6">
                <p className="truncate">{report.deskripsiMasalah}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-xs font-light">{report.tanggalLaporan}</p>
                <Link key={report.idLaporan} to={`/report/${report.idLaporan}`}>
                  <Button className="outline">See Detail</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </>
      )}

      {/* Kondisi kalau nggak ketemu apa-apa */}
      {searchTerm !== "" && filteredReports.length === 0 && (
        <img
          src={notFoundImage}
          alt="notfound"
          width={500}
          className="mx-auto opacity-70"
        />
      )}
    </SectionContainer>
  );
};
