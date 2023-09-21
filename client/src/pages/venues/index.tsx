import { useEffect, useState } from "react";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import Link from "next/link";
import { Venue } from "store/types";
import axiosConfig from 'utils/axiosConfig';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BadgeCard.module.css';

function VenueList() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    axiosConfig
      .get("/api/venues")
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }, []);

  return (
    <LandingLayout title="BlueTix - Venues" withNavbar withFooter>
      <Section title="Venues">
        <div className="grid h-full w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => {
            return <VenueCard venue={venue} key={venue.venueid} />;
          })}
        </div>
      </Section>
    </LandingLayout>
  );
}

export default VenueList;

const VenueCard = ({ venue }: { venue: Venue }) => {
  return (

    <Link href={`/venues/${venue.venueid}`} className="flex flex-wrap">
      <Card style={{ border: "none" }} shadow="sm" padding="lg" radius="md" withBorder className='w-full transition-transform duration-400 transform hover:scale-105'>
        <Card.Section className='border-t border-gray-300'>
          <Image src="images/venue.jpg" alt={venue.name} height={220} />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={500}>{venue.name}</Text>
          {/* <Badge variant="light">
        {venue.address}
        </Badge> */}
        </Group>

        <Text size="sm" c="dimmed" mb="xs">
          {venue.address}
        </Text>

        <Text size="sm">
          {venue.description}
        </Text>

        {/* <Button radius="md" style={{ flex: 1 }}>
            Show details
          </Button> */}
        {/* <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart className={classes.like} stroke={1.5} />
            </ActionIcon> */}
        {/* </Group> */}
      </Card>
    </Link>
  );
};
