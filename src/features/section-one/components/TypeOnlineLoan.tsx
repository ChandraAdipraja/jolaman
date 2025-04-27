import { FaCheck } from "react-icons/fa6";
export const TypeOnlineLoan = () => {
  const legalList = [
    {
      name: "Terdaftar di Badan Usaha Milik Negara (BUMN)",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Chandra Ganteng",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Primodial",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Suka kamu",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "One Direction",
      icon: <FaCheck className="text-primary" />,
    },
  ];
  const illegalList = [
    {
      name: "Tidak Terdaftar di Badan Usaha Milik Negara (BUMN)",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Warjo",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Raja Hayam",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Lazatto",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Hi-five",
      icon: <FaCheck className="text-primary" />,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-secondary">Jenis Pinjol</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col bg-white shadow-2xl rounded-2xl p-8 space-y-4">
          <h1 className="text-3xl font-semibold">Legal</h1>
          <p className="font-light text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            sequi!
          </p>
          <div className="flex flex-col items-center gap-x-5 gap-y-2">
            {legalList.map((item) => (
              <div className="flex items-center self-start gap-x-2 text-sm">
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-2xl rounded-2xl p-8 space-y-4">
          <h1 className="text-3xl font-semibold">Illegal</h1>
          <p className="font-light text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            sequi!
          </p>
          <div className="flex flex-col items-center gap-x-5 gap-y-2">
            {illegalList.map((item) => (
              <div className="flex items-center self-start gap-x-2 text-sm">
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
