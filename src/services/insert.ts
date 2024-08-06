import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../libs/firebase"
import { v4 as CreateId} from "uuid";
import { Photo } from "../types/Photo";

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
        
        const randomName = CreateId();
        const newFile = ref(storage, `Images/${randomName}`);
        const upload = await uploadBytes(newFile, file);
        const photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo
    
    }else{
        return new Error('File type not allowed...')
    }
}