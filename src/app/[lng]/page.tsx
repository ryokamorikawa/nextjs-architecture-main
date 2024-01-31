'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import SignInScreen from './(features)/authentication/SignInScreen';
import WeatherScreen from './(features)/weather/WeatherScreen';

const Home = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="container mx-auto max-w-screen-xl flex-1 px-5 py-10">
      {user ? <WeatherScreen /> : <SignInScreen />}
    </div>
  );
};

export default Home;
