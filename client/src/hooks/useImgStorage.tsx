import { useState, useEffect } from "react";

import { storage } from "./../app/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function useImgStorage(
  file: Blob | null,
  filename: string,
  folder: string
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!file) return;
    if (!filename && !folder) return;

    const imgRef = ref(storage, `${folder}/${filename}`);

    const uploadTask = uploadBytesResumable(imgRef, file);

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
        // Upload completed successfully.
        console.log("Complete (from hook)");

        setLoading(false);
        setComplete(true);
      }
    );
  }, [file, filename, folder]);

  return { loading, error, complete };
}
