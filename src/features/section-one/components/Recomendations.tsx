import CardRecommendations from "./CardRecommendations";

export const Recomendations = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-secondary text-center">
          Rekomendasi
        </h1>
        <p className="text-xs font-semibold text-muted-foreground">
          Jika Memang Sangat Ingin Melakukan Pinjaman Online
        </p>
      </div>
      <div className="">
        <CardRecommendations />
      </div>
    </div>
  );
};
