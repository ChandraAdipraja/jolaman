import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import useTitle from "../../../hooks/UseTittle";
import { SectionContainer } from "../../../layouts/Section";
import { ReportInnerPage } from "../components/ReportInnerPage";

export const ReportPage = () => {
  useTitle("Report");
  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center pt-4 pb-30  lg:max-w-screen-md md:pb-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Lapor Pinjaman Online Ilegal</CardTitle>
          <CardDescription>
            Laporkan jika ada indikasi penipuan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportInnerPage />
        </CardContent>
      </Card>
    </SectionContainer>
  );
};
