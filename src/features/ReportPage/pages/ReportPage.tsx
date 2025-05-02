import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
import { SectionContainer } from "../../../layouts/Section";

interface ReportFormData {
  namaPelapor: string;
  namaPinjol: string;
  deskripsiMasalah: string;
  buktiMasalah: FileList | undefined;
}

export const ReportPage = () => {
  const form = useForm<ReportFormData>({
    defaultValues: {
      namaPelapor: "",
      namaPinjol: "",
      deskripsiMasalah: "",
      buktiMasalah: undefined,
    },
  });

  const uploadMultipleToCloudinary = async (
    files: File[]
  ): Promise<string[]> => {
    const urls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "image_pinjol"); // Ganti dengan upload_preset kamu

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dg5j7kii8/image/upload", // Ganti dengan Cloudinary cloud name kamu
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        urls.push(data.secure_url); // Ambil secure_url dari hasil upload
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Error uploading images to Cloudinary");
      }
    }

    return urls; // Return semua URL gambar dalam array
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = form.getValues();

    // Generate UUID untuk laporan
    const reportId = uuidv4();

    // Format tanggal
    const tanggalLaporan = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Siapkan FormData untuk dikirim
    const data = new FormData();
    data.append("idLaporan", reportId);
    data.append("namaPelapor", formData.namaPelapor);
    data.append("namaPinjol", formData.namaPinjol);
    data.append("deskripsiMasalah", formData.deskripsiMasalah);
    data.append("tanggalLaporan", tanggalLaporan);
    data.append("statusLaporan", "false"); // Kirim status laporan false

    try {
      // Jika ada file, upload ke Cloudinary
      if (formData.buktiMasalah && formData.buktiMasalah.length > 0) {
        const files = Array.from(formData.buktiMasalah).slice(0, 5); // Ambil maksimal 5 file
        const uploadedUrls = await uploadMultipleToCloudinary(files); // Panggil fungsi uploadMultipleToCloudinary

        // Gabungkan URL menjadi satu string
        const urlsString = uploadedUrls.join(" | ");
        data.append("buktiMasalah", urlsString); // Simpan URL gambar di FormData
      }

      // Kirim data ke Google Sheet
      const response = await axios.post(
        "https://api.sheetbest.com/sheets/0b3a6b09-a17c-4383-b8ca-3329cc59d58c", // Ganti dengan Sheet ID kamu
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response dari Google Sheets: ", response.data);
      form.reset(); // Reset form setelah submit berhasil
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center pt-4 pb-30 md:pb-0 lg:max-w-screen-md md:pb-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Report Pinjaman Online Illegal</CardTitle>
          <CardDescription>
            Laporkan jika ada indikasi penipuan.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input
                        placeholder="Nama pinjol yang dilaporkan"
                        {...field}
                      />
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

              {/* Bukti Masalah (Image Upload) */}
              <FormField
                name="buktiMasalah"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bukti Masalah (Opsional, max 5 gambar)
                    </FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <label
                          htmlFor="upload-file"
                          className="flex flex-col items-center justify-center w-full min-h-[10rem] px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                        >
                          {field.value && field.value.length > 0 ? (
                            <div className="flex flex-col items-center gap-2">
                              {Array.from(field.value).map(
                                (file: File, index: number) => (
                                  <p
                                    key={index}
                                    className="text-sm text-gray-600"
                                  >
                                    {file.name}
                                  </p>
                                )
                              )}
                            </div>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-gray-400 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16V4m0 0l-4 4m4-4l4 4M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2"
                                />
                              </svg>
                              <p className="text-gray-400 text-sm">
                                Drag & Drop or Click to Upload
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          id="upload-file"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 5) {
                              alert("Maksimal upload 5 gambar saja.");
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

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Submit Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionContainer>
  );
};
