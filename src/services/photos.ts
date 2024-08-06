import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const getAll = async () =>{
    try{
        const list: Photo[] = [];
    
        const imagesFolder = ref(storage, "Images");
        const photoList = await listAll(imagesFolder);
        
        for(const i in photoList.items){
            
            const photoUrl = await getDownloadURL(photoList.items[i]);
    
            list.push({
                name: photoList.items[i].name,
                url: photoUrl,
            })
        }
    
        return list;
    } catch(error){
        console.error("There is an error", error);
        return [];
    }
}