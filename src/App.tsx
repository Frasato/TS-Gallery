import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles.ts';
import * as Photos from './services/photos.ts';
import * as UploadPhotos from './services/insert.ts';
import { Photo } from './types/Photo.ts';
import { PhotoItem } from './components/PhotoItem/index.tsx';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo[]>([]);

  useEffect(()=>{
    const getPhotos = async () =>{
      setLoading(true);

      const photos = await Photos.getAll();
      setPhoto(photos);

      setLoading(false);
    }

    getPhotos();
  },[]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
      setFileLoading(true);
      const result = await UploadPhotos.insert(file);
      setFileLoading(false);

      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`);
      }else{
        const newPhotoList = [...photo];
        newPhotoList.push(result);
        setPhoto(newPhotoList);
      }
    }
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
        
        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type='file' name='image'/>
          <input type='submit' value='Upload'/>
          {fileLoading &&
            <h1>Uploading...</h1>
          }
        </C.UploadForm>

        {loading &&
          <C.ScreenWarning>
            <div className='emoji'>✋</div>
            <div>Loading...</div>
          </C.ScreenWarning>
        }

        {!loading && photo.length === 0 &&
          <C.ScreenWarning>
            <div className='emoji'>😢</div>
            <div>Do not have any photos!</div>
          </C.ScreenWarning>
        }

        {!loading && photo.length > 0 &&
          <C.PhotoList>
            {photo.map((item, index)=>(
              <PhotoItem key={index} url={item.url} name={item.name}/>
            ))}
          </C.PhotoList>
        }
      </C.Area>
    </C.Container>
  )
}

export default App
