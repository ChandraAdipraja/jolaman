import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";

import toast from "react-hot-toast";
import { useRef } from "react";

export interface ReportFormData {
  namaPelapor: string;
  namaPinjol: string;
  deskripsiMasalah: string;
  buktiMasalah: FileList | undefined;
}

const uploadMultipleToCloudinary = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "image_pinjol");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dg5j7kii8/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    urls.push(data.secure_url);
  }

  return urls;
};

export const ReportInnerPage = () => {
  const form = useForm<ReportFormData>({
    defaultValues: {
      namaPelapor: "",
      namaPinjol: "",
      deskripsiMasalah: "",
      buktiMasalah: undefined,
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = form.getValues();
    const reportId = uuidv4();
    const tanggalLaporan = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const data = new FormData();
    data.append("idLaporan", reportId);
    data.append("namaPelapor", formData.namaPelapor);
    data.append("namaPinjol", formData.namaPinjol);
    data.append("deskripsiMasalah", formData.deskripsiMasalah);
    data.append("tanggalLaporan", tanggalLaporan);
    data.append("statusLaporan", "false");

    try {
      toast.loading("Mengirim Laporan...");
      if (formData.buktiMasalah && formData.buktiMasalah.length > 0) {
        const files = Array.from(formData.buktiMasalah).slice(0, 5);
        const uploadedUrls = await uploadMultipleToCloudinary(files);
        const urlsString = uploadedUrls.join(" | ");
        data.append("buktiMasalah", urlsString);
      }

      await axios.post(
        "https://api.sheetbest.com/sheets/0b3a6b09-a17c-4383-b8ca-3329cc59d58c",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.dismiss();
      toast.success("Berhasil Mengirim Laporan");
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Gagal Mengirim Laporan");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Pelapor */}
        <FormField
          name="namaPelapor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kamu</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama kamu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nama Pinjol */}
        <FormField
          name="namaPinjol"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pinjol</FormLabel>
              <FormControl>
                <Input placeholder="Nama pinjol yang dilaporkan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deskripsi Masalah */}
        <FormField
          name="deskripsiMasalah"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Masalah</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32"
                  placeholder="Ceritakan apa yang terjadi..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bukti Masalah */}
        <FormField
          name="buktiMasalah"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bukti Masalah (Opsional, max 5 gambar)</FormLabel>
              <FormControl>
                <div className="w-full">
                  <label
                    htmlFor="upload-file"
                    className="flex flex-col items-center justify-center w-full min-h-[10rem] px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                  >
                    {field.value && field.value.length > 0 ? (
                      <div className="flex flex-col items-center gap-2">
                        {Array.from(field.value).map((file, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            {file.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-400 text-sm">
                          Drag & Drop or Click to Upload
                        </p>
                      </>
                    )}
                  </label>
                  <input
                    ref={fileInputRef}
                    id="upload-file"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 5) {
                        alert("Maksimal upload 5 gambar.");
                        return;
                      }
                      field.onChange(files);
                    }}
                    className="hidden"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Report
        </Button>
      </form>
    </Form>
  );
};
