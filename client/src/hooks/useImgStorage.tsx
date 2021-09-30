import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { storage } from "./../app/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function useImgStorage({
  file,
  filename,
  folder,
  maxDimension,
}: {
  file: Blob | null;
  filename: string;
  folder: string;
  maxDimension: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [complete, setComplete] = useState(false);
  const [resziedImg, setResziedImg] = useState<any>();

  useEffect(() => {
    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          maxDimension,
          maxDimension,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log("Uri:", uri);
            setResziedImg(uri);
          },
          "blob",
          200,
          200
        );
      } catch (err) {
        console.log("Error:", err);
        setError(err);
      }
    }
  }, [file, maxDimension]);

  useEffect(() => {
    if (!resziedImg) return;
    if (!filename && !folder) return;

    const imgRef = ref(storage, `${folder}/${filename}`);

    const uploadTask = uploadBytesResumable(imgRef, resziedImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.state === "running") {
          console.log("Running from hook");
          setLoading(true);
        }
      },
      (error) => {
        console.log("Error:", error);
        setError(error);
      },
      () => {
        setLoading(false);
        setComplete(true);
      }
    );
  }, [file, filename, folder, resziedImg]);

  return { loading, error, complete };
}
