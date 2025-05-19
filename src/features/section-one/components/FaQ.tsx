import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

const Datas = [
  {
    question: "Apa itu denda ?",
    answer:
      "Denda adalah biaya tambahan yang dikenakan jika Anda telat membayar cicilan pinjaman. Di pinjol legal, besaran denda harus transparan dan sesuai dengan aturan OJK.",
  },
  {
    question: "Apa itu sisa pinjaman ?",
    answer:
      "Sisa pinjaman adalah jumlah utang yang masih belum dibayar oleh peminjam. Setiap kali Anda membayar cicilan, sisa pinjaman akan berkurang hingga lunas.",
  },
  {
    question: "Apa itu bunga majemuk ?",
    answer:
      "Bunga majemuk adalah bunga yang terus bertambah karena dihitung dari jumlah pinjaman ditambah bunga yang sudah ada sebelumnya. Semakin lama Anda meminjam, beban bunga akan semakin besar.",
  },
  {
    question: "Apa itu bunga flat ?",
    answer:
      "Bunga flat adalah bunga yang besarannya tetap setiap bulan. Jumlah cicilan tetap dan tidak berubah sepanjang masa pinjaman.",
  },
  {
    question: "Apa itu pokok cicilan ?",
    answer:
      "Pokok cicilan adalah bagian dari cicilan bulanan yang digunakan untuk membayar jumlah pinjaman utama (pokok pinjaman), bukan bunganya.",
  },
  {
    question: "Apa itu bunga cicilan ?",
    answer:
      "Bunga cicilan adalah bagian dari cicilan bulanan yang merupakan biaya tambahan atas pinjaman. Besarnya bunga tergantung pada jenis bunga yang digunakan (flat atau majemuk).",
  },
  {
    question: "Apa itu kalkulator simulasi pinjol ?",
    answer:
      "Kalkulator simulasi pinjol adalah alat bantu yang bisa Anda gunakan untuk menghitung berapa total yang harus dibayar jika meminjam uang melalui pinjol, baik menggunakan bunga majemuk maupun bunga flat. Anda juga bisa menghitung denda jika telat membayar.",
  },
  {
    question: "Apa itu Lapor ?",
    answer:
      "Fitur yang disediakan oleh website kami untuk menampung laporan pinjaman online yang terindikasi ilegal atau bersifat penipuan.",
  },
  {
    question: "Apa itu Cari ?",
    answer:
      "Fitur yang disediakan untuk seseorang mencari apakah pinjaman online yang dituju terindikasi ilegal atau bersifat penipuan berdasarkan laporan.",
  },
];

const FaQ = () => {
  return (
    <div className="flex flex-col justifyy-center gap-2 mt-4 p-4">
      <div>
        <div className=" md:space-y-3">
          <h1 className="text-2xl md:text-5xl font-semibold text-secondary text-center">
            Jawaban Cepat
          </h1>
          <p className="text-xs md:text-sm font-semibold text-muted-foreground text-center">
            Beberapa Pertanyaan Yang Sering Ditanyakan
          </p>
        </div>
      </div>
      <div>
        <Accordion type="single" collapsible>
          {Datas.map((data) => (
            <AccordionItem key={data.question} value={data.question}>
              <AccordionTrigger>{data.question}</AccordionTrigger>
              <AccordionContent>{data.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaQ;
