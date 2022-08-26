import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { toastError } from "../config/toast";

export async function sendImage(img: any) {
    const imageRef = ref(storage, `images/${img?.name}-${uuidv4()}`);
    await uploadBytes(imageRef, img)
        .then(async (resp) => {
            await getDownloadURL(imageRef).then((url) => {
                return url
            })
        })
        .catch((err) => {
            toastError(err.message);
            return ""
        });
}