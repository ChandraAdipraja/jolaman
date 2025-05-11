import { Route, Routes } from "react-router-dom";
import FirstSection from "./features/section-one/pages";
import { PageContainer } from "./layouts/PageContainer";
import { CalculatorPage } from "./features/CalcucaltorPage/pages/CalculatorPage";
import { ReportPage } from "./features/ReportPage/pages/ReportPage";
import { SearchPage } from "./features/SearchPage/pages/SearchPage";
import { DetailedReport } from "./features/ReportPage/pages/DetailedReport";
import { NotFound } from "./404NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PageContainer />}>
        <Route index element={<FirstSection />} />
        <Route path="/calc" element={<CalculatorPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="report/:reportId" element={<DetailedReport />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
