import { useEffect, useState } from 'react';
import LandingLayout from 'layouts/LandingLayout';
import { Section } from 'layouts/Section';
import Link from "next/link";
import { Venue } from "store/types";
import axiosConfig from 'utils/axiosConfig';

function VenueList() {
  const [venues, setVenues] = useState<Venue[]>([]); 

  useEffect(() => {
    axiosConfig.get('/api/venues')
      .then((response) => {
        setVenues(response.data);
        // console.log(venues[0]);
      })
      .catch((error) => {
        console.error('Error fetching venues:', error);
      });
  }, []);

  return (
    <LandingLayout title="BlueTix - Venues">
      <Section title="Venues">
        {/* ... */}
        <div className="bg-b1 mx-auto min-h-[600px] w-full max-w-5xl bg-gray-200 px-4 sm:px-6 xl:max-w-6xl xl:px-8">
          <div className="grid h-full w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => {
              return <VenueCard venue={venue} key={venue.venueid} />;
            })}
          </div>
        </div>
      </Section>
    </LandingLayout>
  );
}

export default VenueList;

const VenueCard = ({ venue }: { venue: Venue }) => {
  return (
    <Link href={`/venues/${venue.venueid}`} className="flex justify-center">
      <div className="flex h-[360px] w-[320px] flex-col bg-white shadow-lg">
        <img src={venue.image} className="aspect-video w-full" />
        <div className="mt-2 flex h-full w-full flex-col gap-2 bg-white px-2">
          <h2>{venue.name}</h2>
          <span>{venue.description}</span>
          <span>{venue.address}</span>
        </div>
      </div>
    </Link>
  );
};
