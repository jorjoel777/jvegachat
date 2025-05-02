import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase"; // asegúrate de que este sea el path correcto a tu config

const db = getFirestore(app);

export const saveLead = async (data: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}) => {
  try {
    await addDoc(collection(db, "leads"), data);
    console.log("Lead guardado exitosamente");
  } catch (error) {
    console.error("Error al guardar lead:", error);
  }
};
