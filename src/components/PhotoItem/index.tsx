import * as C from './styles.ts';
import { PhotoItemProps } from '../../types/PhotoItemProps.ts';

export const PhotoItem = ({url, name}: PhotoItemProps) =>{
    return(
        <C.Container>
            <img src={url} alt={name}/>
            <h1>{name}</h1>            
        </C.Container>
    );
}