import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "store/types";
import axiosConfig from "utils/axiosConfig";
<<<<<<< HEAD
=======
import { Button, Card, Input, Popover, RangeSlider, Select, Image, Text, Group } from "@mantine/core";
import { getReadableDate } from "utils/getSimpleDate";

>>>>>>> main

export default function Creators() {
  //   const [file, setFile] = useState(null);
  //   const [eventNameUpload, setEventNameUpload] = useState("");
  //   const [eventNameQuery, setEventNameQuery] = useState("");
  //   const [queriedEventName, setQueriedEventName] = useState("");
  //   const [fileList, setFileList] = useState([]);

  //   const handleFileChange = (event: any) => {
  //     // Get the selected file from the input
  //     const selectedFile = event.target.files[0];
  //     setFile(selectedFile);
  //   };
  //   const handleUploadChange = (event: any) => {
  //     // Update the event name state when the user types in the input field
  //     setEventNameUpload(event.target.value);
  //   };
  //   const handleQueryChange = (event: any) => {
  //     // Update the event name state when the user types in the input field
  //     setEventNameQuery(event.target.value);
  //   };

  //   const handleFileUpload = async () => {
  //     if (!file) {
  //       console.error("No file selected.");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:9090/api/nft/upload/" + eventNameUpload,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       // Handle the response from the backend
  //       console.log(response.data);
  //     } catch (error) {
  //       // Handle errors
  //       console.error("File upload failed:", error);
  //     }
  //   };

  //   // Function to fetch and update the file list
  //   const fetchFileList = async () => {
  //     try {
  //       if (eventNameQuery) {
  //         const response = await axios.get(
  //           "http://localhost:9090/api/nft/events/" + eventNameQuery
  //         );
  //         setFileList(response.data);
  //         setQueriedEventName(eventNameQuery);
  //       } else {
  //         console.log("Missing name query input");
  //         setFileList([]);
  //       }
  //     } catch (error: any) {
  //       if (error.response && error.response.status === 404) {
  //         // Handle 404 error here by setting fileList to an empty array
  //         setFileList([]);
  //       } else {
  //         console.error("Failed to fetch file list:", error);
  //       }
  //     }
  //   };

  const [creatorEvents, setCreatorEvents] = useState<any[]>([]); // Replace 'any[]' with the actual type for your events


  // Simulate fetching creator events from your backend
  useEffect(() => {
<<<<<<< HEAD
    axiosConfig.get('/api/events/' + 1)
      .then((response) => {
        setCreatorEvents(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch creator events: ', error);
      });
=======
    // Replace this with your actual API call to fetch creator events
    const fetchData = async () => {
      try {
        // Fetch creator events and set them in the state
        const creatorId = Number(1);
        axiosConfig.get('/api/creators/' + creatorId)
          .then((response) => {
            setCreatorEvents(response.data);
          })
          .catch((error) => {
            console.error('Error fetching Creator Events:', error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
>>>>>>> main
  }, []);

  return (
    <>
<<<<<<< HEAD
      <LandingLayout title="BlueTix - About Us"
      //   permissions={[Role.ADMIN]}
      >
        {(user) => (
          <Section title="For Creators">
            <div>
              <div>
                <Link href="creators/create">
                  <Button>Create New Event</Button>
                </Link>
              </div>
              <hr className="mt-4 mb-4" />
              <h2>Your Past Events</h2>
              <ul>
                {creatorEvents.map((event) => (
                  <li key={event.id}>
                    {/* Display event details, you can customize this */}
                    <div>{event.name}</div>
                    <div>Date: {event.date}</div>
                    {/* Add more event details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}
=======
      <LandingLayout
        permissions={[Role.ADMIN]}
        title="About Us"
        withNavbar
      >
        <Section title="For Creators">
          <div>
            <div>
              <Link href="creators/create">
                <Button>Create New Event</Button>
              </Link>
            </div>
            <hr className="mt-4 mb-4" />
            <h2>Your Events</h2>
            <div className="grid h-full w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
              {creatorEvents.map((event) => (
                <Card className="relative h-[280px] bg-gradient-to-t from-gray-0 via-dark-6 transition-transform duration-400 transform hover:scale-105" p="lg" shadow="lg" radius="md" component="a" href={`/events/${event.id}`} target="_blank">
                  <Image className="absolute inset-0 bg-cover transition-transform transform duration-500 ease transform hover:scale-105" src="images/event.jpeg" alt={event.name} height={280} />

                  <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gradient-to-b from-transparent via-transparent to-black" />

                  <div className="h-full relative flex flex-col justify-end z-1">
                    <div>
                      <Text size="lg" className="text-white mb-1" fw={500} color="white">
                        {event.name}
                      </Text>

                      <Group justify="between" gap="xs">
                        <Text size="sm" color="#909296">
                          {event.location}
                        </Text>

                        {/* <Text size="sm" className="ml-auto" color="#909296">
                      <span>{event.dates}</span>
                    </Text> */}
                      </Group>
                    </div>
                  </div>
                </Card>
                // <li key={event.id}>
                //   {/* Display event details, you can customize this */}
                //   <div>{event.name}</div>
                //   <div>Date: {event.date}</div>
                //   {/* Add more event details as needed */}
                // </li>
              ))}
            </div>
          </div>
        </Section>
>>>>>>> main
      </LandingLayout>
    </>
  );

}


