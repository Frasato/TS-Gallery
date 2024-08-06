import { useState, useEffect } from 'react';
import * as C from './App.styles.ts';
import * as Photos from './services/photos.ts';
import { Photo } from './types/Photo.ts';

const App = () => {

  const [loading, setLoading] = useState<boolean>(false);
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

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
        {/* Area de upload */}

        {loading &&
          <C.ScreenWarning>
            <div className='emoji'>✋</div>
            <div>Loading...</div>
          </C.ScreenWarning>
        }

        {!loading && photo.length > 0 &&
          <C.PhotoList>
            {photo.map((item, index)=>(
              <div>
                {item.name}
              </div>
            ))}
          </C.PhotoList>
        }
      </C.Area>
    </C.Container>
  )
}

export default App
