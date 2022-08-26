import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { toastError } from "../config/toast";

export async function sendImage(img: any): Promise<string> {
    const imageRef = ref(storage, `images/${img?.name}-${uuidv4()}`);
    try {
        const resUpload = await uploadBytes(imageRef, img)
        try {
            const resDownloadUrl = await getDownloadURL(imageRef)
            return resDownloadUrl
        } catch (error: any) {
            console.log(error)
            toastError(error)
            return ""
        }
    } catch (error: any) {
        console.log(error)
        toastError(error)
        return ""
    }

}