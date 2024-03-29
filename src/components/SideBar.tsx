import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({state}) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

   function handleClickButton(id: number) {
    state.setSelectedGenreId(id);
  }


  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(

    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={state.selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}