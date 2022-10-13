import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'ROCK');
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView();
  });

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (
    <div ref={divRef} className="flex flex-col">
      <div
        className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10
            "
      >
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreListId || 'Rock'}
        </h2>
        <select
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          onChange={(e) => { dispatch(selectGenreListId(e.target.value)); }}
          value={genreListId || 'ROCK'}
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {/* display songs */}
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {data?.map((song, index) => (
          <SongCard key={song.key} data={data} song={song} isPlaying={isPlaying} activeSong={activeSong} i={index} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
