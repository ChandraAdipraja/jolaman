import { FaGithub } from "react-icons/fa6";

export const Risk = () => {
  const risk = [
    {
      icon: <FaGithub className="text-3xl text-primary" />,
      title: "Bunga dan denda yang tinggi",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <FaGithub className="text-3xl text-violet-500" />,
      title: "Penyebaran data pribadi",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <FaGithub className="text-3xl text-pink-600" />,
      title: "Teror penagihan",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <FaGithub className="text-3xl text-lime-600" />,
      title: "Utang menumpuk",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <FaGithub className="text-3xl text-shadow-cyan-500" />,
      title: "Gangguan mental",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
    {
      icon: <FaGithub className="text-3xl text-yellow-500" />,
      title: "Masalah hukum",
      description:
        "Suku bunga dan denda yang tinggi dapat mengakibatkan biaya yang besar dan mengurangi hasil pinjaman.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-secondary text-center">
          Resiko Pinjaman Online
        </h1>
        <p className="text-xs font-semibold text-muted-foreground text-center">
          Harap Perhatikan Beberapa Risiko Berikut Jika Ingin Melakukan Pinjaman
          Online
        </p>
      </div>
      {risk.map((item) => (
        <div className="flex flex-row gap-5 justify-start items-center bg-white shadow-xl p-4 rounded-xl">
          <div className="bg-gray-50 rounded-full p-4">{item.icon}</div>
          <div className="flex flex-col gap-y-2 text-justify">
            <h1 className="text-md font-semibold">{item.title}</h1>
            <p className="text-sm font-light">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
