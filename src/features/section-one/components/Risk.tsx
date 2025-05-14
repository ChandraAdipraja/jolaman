import { MdOutlineTrendingUp } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { FaHeartBroken } from "react-icons/fa";
import { GiTakeMyMoney, GiTerror } from "react-icons/gi";

export const Risk = () => {
  const risk = [
    {
      icon: <MdOutlineTrendingUp className="text-3xl text-primary" />,
      title: "Bunga dan denda yang tinggi",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <ImProfile className="text-3xl text-violet-500" />,
      title: "Penyebaran data pribadi",
      description:
        "Data seperti kontak, foto, dan informasi pribadi bisa disebar jika terjadi keterlambatan pembayaran.",
    },
    {
      icon: <GiTerror className="text-3xl text-pink-600" />,
      title: "Teror penagihan",
      description:
        "Penagihan dilakukan secara kasar, termasuk ancaman, kata-kata kasar, dan intimidasi ke keluarga atau teman.",
    },
    {
      icon: <GiTakeMyMoney className="text-3xl text-lime-600" />,
      title: "Utang menumpuk",
      description:
        "Karena bunga tinggi dan sistem gali lubang tutup lubang, utang bisa terus membesar dan sulit dilunasi.",
    },
    {
      icon: <FaHeartBroken className="text-3xl text-cyan-500" />,
      title: "Gangguan mental",
      description:
        "Tekanan dari pinjol bisa menyebabkan stres, kecemasan, hingga depresi.",
    },
    {
      icon: <GoLaw className="text-3xl text-yellow-500" />,
      title: "Masalah hukum",
      description:
        "Jika melibatkan pinjol ilegal, korban bisa terjebak kasus hukum atau kesulitan mencari perlindungan hukum.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-3 md:pb-10">
      <div>
        <div className="pb-4 md:space-y-3">
          <h1 className="text-2xl md:text-5xl font-semibold text-secondary text-center">
            Resiko Pinjaman Online
          </h1>
          <p className="text-xs md:text-sm font-semibold text-muted-foreground text-center">
            Harap Perhatikan Beberapa Risiko Berikut Jika Ingin Melakukan
            Pinjaman Online
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {risk.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-5 items-start bg-white shadow-xl p-4 rounded-xl w-full md:w-[48%]"
          >
            <div className="bg-gray-50 rounded-full p-4">{item.icon}</div>
            <div className="flex flex-col gap-y-2 text-justify">
              <h1 className="text-md font-semibold">{item.title}</h1>
              <p className="text-sm font-light">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
