import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;

  const [country, setCountry] = useState('AR');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  const divRef = useRef(null);

  useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${geoApiKey}`)
      .then((res) => setCountry(res?.data?.location?.country))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  useEffect(() => {
    divRef?.current?.scrollIntoView();
  });

  if (isFetching && loading) return <Loader title="Loading songs around you..." />;

  if (error && country) return <Error />;

  return (
    <div ref={divRef} className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song?.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
