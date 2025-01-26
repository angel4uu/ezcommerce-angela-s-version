import {ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {storage} from "../services/firebase";
import {v4} from "uuid";

export async function getFileURL(elemFile:File, storageDirec:string) {
  if (!elemFile) return null;

  try {
    const shortUUID = v4().split('-')[0]
    const fileRef = ref(storage, `${storageDirec}/${elemFile.name}-${shortUUID}`);
    await uploadBytes(fileRef, elemFile);
    const fileURL = await getDownloadURL(fileRef);
    return fileURL;
  } catch (error) {
    console.error("Error subiendo el archivo o obteniendo la URL:", error);
    return null;
  }
}

export async function deleteFileFromFirebase(fileURL: string) {
  try {
    const fileRef = ref(storage, fileURL);
    await deleteObject(fileRef); // Eliminar archivo
    console.log("Archivo eliminado correctamente:", fileURL);
  } catch (error) {
    console.error("Error eliminando el archivo:", error);
  }
}