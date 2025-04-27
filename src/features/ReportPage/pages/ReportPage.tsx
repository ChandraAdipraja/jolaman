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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = form.getValues();

    // Generate UUID untuk laporan
    const reportId = uuidv4(); // Generate UUID yang unik

    // Format tanggal dalam format Indonesia
    const tanggalLaporan = new Date().toLocaleDateString("id-ID", {
      weekday: "long", // Nama hari (Senin, Selasa, dst.)
      day: "2-digit", // Tanggal (27)
      month: "long", // Nama bulan (April)
      year: "numeric", // Tahun (2025)
    });

    console.log("Tanggal Laporan: ", tanggalLaporan);
    console.log("Report ID: ", reportId); // Menampilkan UUID yang dibuat

    // Membuat FormData untuk mengirim data dan file gambar
    const data = new FormData();
    data.append("idLaporan", reportId); // Menambahkan UUID ke formData
    data.append("namaPelapor", formData.namaPelapor);
    data.append("namaPinjol", formData.namaPinjol);
    data.append("deskripsiMasalah", formData.deskripsiMasalah);
    data.append("tanggalLaporan", tanggalLaporan);
    data.append("statusLaporan", "false"); // Kirim status laporan false

    // If file exists, upload to Cloudinary
    if (formData.buktiMasalah && formData.buktiMasalah[0]) {
      const file = formData.buktiMasalah[0];

      // Upload to Cloudinary
      const formCloudinary = new FormData();
      formCloudinary.append("file", file);
      formCloudinary.append("upload_preset", "image_pinjol"); // Replace with your Cloudinary upload preset

      try {
        // Step 1: Upload to Cloudinary
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dg5j7kii8/image/upload", // Replace with your Cloudinary cloud name
          formCloudinary
        );

        const imageUrl = cloudinaryResponse.data.secure_url; // Cloudinary URL

        // Step 2: Append Cloudinary image URL to data
        data.append("buktiMasalah", imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return;
      }
    }

    try {
      // Step 3: Submit the form data (including image URL) to your server
      const response = await axios.post(
        "https://api.sheetbest.com/sheets/0b3a6b09-a17c-4383-b8ca-3329cc59d58c",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      form.reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center pt-4 pb-30"
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
                    <FormLabel>Bukti Masalah (Opsional)</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <label
                          htmlFor="upload-file"
                          className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                        >
                          {/* Cek apakah ada file yang diupload */}
                          {field.value && field.value.length > 0 ? (
                            <>
                              {/* Tampilkan nama file yang sudah diupload */}
                              <p className="text-sm text-gray-600">
                                {field.value[0].name}
                              </p>
                            </>
                          ) : (
                            <>
                              {/* Kalau belum ada file, tampilkan default logo dan teks */}
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
                          onChange={(e) => {
                            if (e.target.files) {
                              field.onChange(e.target.files);
                            }
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
