import { useState, useEffect } from 'react';
import * as C from './App.styles.ts';
import { getAll } from './services/photos.ts';
import { Photo } from './types/Photo.ts';

const App = () => {

  const [list, setList] = useState<Photo[]>([]);

  useEffect(()=>{
    async function getAllPhotos(){
      const listPhotos: Photo[] = await getAll();
      setList(listPhotos);
    }

    getAllPhotos();
  },[]);

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
        {/* Area de upload */}

        {list.map((item)=>{
          return(
              <h1>{item.name}</h1>
          );
        })}
      </C.Area>
    </C.Container>
  )
}

export default App
