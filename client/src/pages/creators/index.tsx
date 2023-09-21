import { Button } from "@mantine/core";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "store/types";

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
    // Replace this with your actual API call to fetch creator events
    const fetchData = async () => {
      try {
        // Fetch creator events and set them in the state
        const response = await fetch('/api/creator/events'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setCreatorEvents(data);
        } else {
          throw new Error('Failed to fetch creator events');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
      <hr className="mt-4 mb-4"/>
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
      </LandingLayout>
    </>
  );
}
