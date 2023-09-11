import { Button } from "@mantine/core";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import Link from "next/link";
import { useState } from "react";
import { Role } from "store/types";

export default function Creators() {
  const [file, setFile] = useState(null);
  const [eventNameUpload, setEventNameUpload] = useState("");
  const [eventNameQuery, setEventNameQuery] = useState("");
  const [queriedEventName, setQueriedEventName] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event: any) => {
    // Get the selected file from the input
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleUploadChange = (event: any) => {
    // Update the event name state when the user types in the input field
    setEventNameUpload(event.target.value);
  };
  const handleQueryChange = (event: any) => {
    // Update the event name state when the user types in the input field
    setEventNameQuery(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:9090/api/nft/upload/" + eventNameUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the backend
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("File upload failed:", error);
    }
  };

  // Function to fetch and update the file list
  const fetchFileList = async () => {
    try {
      if (eventNameQuery) {
        const response = await axios.get(
          "http://localhost:9090/api/nft/events/" + eventNameQuery
        );
        setFileList(response.data);
        setQueriedEventName(eventNameQuery);
      } else {
        console.log("Missing name query input");
        setFileList([]);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error here by setting fileList to an empty array
        setFileList([]);
      } else {
        console.error("Failed to fetch file list:", error);
      }
    }
  };

  return (
    <>
      <LandingLayout title="BlueTix - About Us" permissions={[Role.ADMIN]}>
        {(user) => (
          <Section title="For Creators">
            <div className="mb-4">
              <h1>Upload JSON</h1>
              <input
                type="text"
                placeholder="Enter Event Name"
                value={eventNameUpload}
                onChange={handleUploadChange}
              />
              <input type="file" accept=".json" onChange={handleFileChange} />
              <Button onClick={handleFileUpload}>Upload File</Button>
            </div>
            <hr />
            <div className="mt-4">
              <h1>List of Files:</h1>
              <input
                type="text"
                placeholder="Enter Event Name"
                value={eventNameQuery}
                onChange={handleQueryChange}
              />
              <Button onClick={fetchFileList}>Query</Button>
              <ul>
                {fileList.map((fileName, index) => (
                  <li key={index}>
                    {fileName}
                    {/* Add a download link for each file */}
                    <Button className="ml-10">
                      <Link
                        href={`http://localhost:9090/api/nft/${queriedEventName}/${fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                    </Button>
                    <Button className="ml-10">
                      <Link
                        href={`http://localhost:9090/api/nft/download/${queriedEventName}/${fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </Link>
                    </Button>
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
