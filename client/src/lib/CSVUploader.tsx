import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import customFetch from "@/utils/customFetch";
import { useState } from "react";
import { toast } from "react-toastify";
// import { CSVUploaderProps } from "./csv";
import { useAllMultimediaContext } from "@/pages/Multimedia";

export function CSVUploader({ path, refresh, komisi, aktif }: any) {
  // upload state

  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Pilih file CSV terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (komisi) {
      formData.append("komisi", komisi);
    }

    try {
      await customFetch.post(path, formData);
      refresh();
      return toast.success("Item added successfully ");
    } catch (error: any) {
      return toast.error("Periksa kembali unique constraint atau data null");
    }
  };

  return (
    <div className="mr-4 grid grid-flow-col max-w-sm items-center gap-1.5 formInput">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="text-black"
        disabled={aktif}
      />
      <Button disabled={aktif} onClick={handleUpload}>
        Upload File
      </Button>
    </div>
  );
}
