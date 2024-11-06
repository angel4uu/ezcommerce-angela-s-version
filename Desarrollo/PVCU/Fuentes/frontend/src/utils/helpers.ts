import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "../services/firebase";
import {v4} from "uuid";

export async function getFileURL(elemFile:File, storageDirec:string) {
  if (!elemFile) return null;

  try {
    const fileRef = ref(storage, `${storageDirec}/${elemFile.name}-${v4()}`);
    await uploadBytes(fileRef, elemFile);
    const fileURL = await getDownloadURL(fileRef);
    return fileURL;

  } catch (error) {
    console.error("Error subiendo el archivo o obteniendo la URL:", error);
    return null;
  }
}