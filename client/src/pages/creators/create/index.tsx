import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import Link from "next/link";
import { JSX, useCallback, useEffect, useState } from "react";
import {
  CalendarDate,
  Role,
  Sections,
  Session,
  TimeRange,
  Venue,
  categoryPricing,
  // ticketFormDTO,
} from "store/types";
import axiosConfig from "utils/axiosConfig";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment, { now } from "moment";
import styles from "components/Calendar/calendar.module.css";

import {
  Paper,
  Select,
  TextInput,
  Textarea,
  Button,
  Group,
  FileInput,
  Slider,
  Text,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import router from "next/router";

export default function Create() {
  const localizer = momentLocalizer(moment);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [availDates, setAvailDates] = useState<Session[]>([]);

  const [allEvents, setAllEvents] = useState([]); //both together
  const [existingEvents, setExistingEvents] = useState<CalendarDate[]>([]); //existing venue used dates
  const [newEvents, setNewEvents] = useState([]); //new inputs
  const [eventImage, setEventImage] = useState<File | null>(null);

  const [categoryPricing, setCategoryPricing] = useState<categoryPricing[]>([]);

  const [eventDetails, setEventDetails] = useState({
    name: "",
    venue_id: "",
    description: "",
    faq: "",
    type: "",
    ticket_pricing: "",
    admission_policy: "",
  });

  //Automatically fetch available venues
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

  //For Updating Available Dates after Venue Selected
  const handleVenueChange = (value) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      venue_id: value,
    }));

    axiosConfig
      .get("/api/sessions/findByVenueId/" + (value || ""))
      .then((response) => {
        setAvailDates(response.data);
        const newTimeRanges = response.data.map((item) => ({
          date: new Date(item.date),
          start_time: item.start_time,
          end_time: item.end_time,
        }));
        const newCalendarDates = response.data.map((item) => {
          console.log(item.start_time, item.end_time);
          const [startHours, startMinutes, startSeconds] = item.start_time
            .split(":")
            .map(Number);
          const startDate = new Date(item.date);
          startDate.setHours(startHours, startMinutes, startSeconds);
          const [endHours, endMinutes, endSeconds] = item.end_time
            .split(":")
            .map(Number);
          const endDate = new Date(item.date);
          endDate.setHours(endHours, endMinutes, endSeconds);

          return {
            id: item.sessionid,
            title: "Unavail",
            start: startDate,
            end: endDate,
          };
        });
        setExistingEvents(newCalendarDates);
        setAllEvents(newCalendarDates);
      })
      .catch((error) => {
        console.error("Error fetching available dates:", error);
      });

    axiosConfig
      .get("/api/sections/getCategories/" + value)
      .then((response) => {
        const categoryPricingData = response.data.map((category) => ({
          category: category,
          price: Number(0), // Set the default price to 0
        }));
        setCategoryPricing(categoryPricingData);
      })
      .catch((error) => {
        console.error("Error fetching available categories:", error);
      });
  };

  const handleSliderChange = (category: string, newValue: number) => {
    const updatedCategoryPricing = [...categoryPricing];
    const categoryIndex = updatedCategoryPricing.findIndex(
      (item) => item.category === category
    );

    if (categoryIndex !== -1) {
      updatedCategoryPricing[categoryIndex].price = newValue;
      setCategoryPricing(updatedCategoryPricing);
    }
  };

  const [currentView, setCurrentView] = useState(Views.MONTH);
  const onView = useCallback(
    (newView) => setCurrentView(newView),
    [setCurrentView]
  );
  const [calendarDate, setCalendarDate] = useState(new Date());

  const onNavigate = useCallback(
    (newDate) => {
      setCalendarDate(newDate);
    },
    [setCalendarDate]
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (currentView != "month") {
        const title = "Selected";
        const newEvent = { title, start, end };
        setNewEvents((prevEvents) => [...prevEvents, newEvent]);
        setAllEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        setCurrentView(Views.WEEK);
        onNavigate(start);
      }
    },
    [currentView, onNavigate]
  );
  const handleSelectEvent = useCallback(
    (event) => {
      if (existingEvents.some((e) => e === event)) {
        return;
      }

      if (window.confirm(`Do you want to delete the selected session`)) {
        const updatedEvents = allEvents.filter((e) => e !== event);
        const updatedNewEvents = newEvents.filter((e) => e !== event);
        setNewEvents(updatedNewEvents);
        setAllEvents(updatedEvents);
      }
    },
    [allEvents, setAllEvents, newEvents, setNewEvents]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      date: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const image_url = eventDetails.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    e.preventDefault();
    console.log(eventDetails);
    console.log(newEvents);

    const sessionDTOArray = newEvents.map((event) => {
      console.log(event);
      const { start, end, transaction_addr } = event;
      return {
        date: new Date(start),
        start_time: new Date(start),
        end_time: new Date(end),
        transaction_addr: "0x1234567890abcdef",
      };
    });

    const ticketFormDTO = {
      eventDTO: {
        name: eventDetails.name,
        description: eventDetails.description,
        faq: eventDetails.faq,
        type: eventDetails.type,
        ticket_pricing: eventDetails.ticket_pricing,
        admission_policy: eventDetails.admission_policy,
        image_url: image_url,
      },
      sessionDTOList: sessionDTOArray,
      ticketDTOList: categoryPricing,
      venue_id: Number(eventDetails.venue_id),
    };

    const formDataObj = new FormData();

    formDataObj.append(
      "ticketFormDTO",
      new Blob([JSON.stringify(ticketFormDTO)], { type: "application/json" })
    );
    if (eventImage) {
      formDataObj.append("file", eventImage);
    }

    console.log(ticketFormDTO);

    try {
      const response = await axiosConfig.post(
        "/api/creators/createEventSessionAndTicket",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Form data sent successfully.");
        router.push('/creators');
      } else {
        console.error("Failed to send form data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Handling NFT File uploads
  const [seatNFT, setSeatNFT] = useState<File | null>(null);
  const [standingNFT, setStandingNFT] = useState<File | null>(null);
  const [eventNameUpload, setEventNameUpload] = useState("");
  const [eventNameQuery, setEventNameQuery] = useState("");
  const [queriedEventName, setQueriedEventName] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = (event: any) => {
    setEventNameUpload(event.target.value);
  };
  const handleQueryChange = (event: any) => {
    setEventNameQuery(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!seatNFT) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("file", seatNFT);
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
      console.log(response.data);
    } catch (error) {
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
        <LandingLayout
          permissions={[Role.ADMIN]}
          title="Creators - Create"
          withNavbar
        >
                {(user) => (
                    <Section title="For Creators - Create New Event">
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <h1 className="font-bold text-size-lg mt-8">Basic Information</h1>
                                    <span className="font-light text-size-lg">Craft your event's identity: Name it, share its unique story, and classify its genre. Lay the foundation for an unforgettable experience.</span>
                                    <div className="flex flex-col md:flex-row mt-8">
                                        <div className="md:w-1/2 w-full">
                                            <TextInput
                                                label="Event Name"
                                                name="name"
                                                value={eventDetails.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="md:pl-8 md:w-1/2 w-full">
                                            <Select
                                                label="Type"
                                                name="type"
                                                searchValue={eventDetails.type}
                                                onSearchChange={(value) => setEventDetails({ ...eventDetails, type: value })}
                                                data={['Rock', 'Pop', 'Classical', 'Country', 'Indie', 'EDM', 'Jazz', 'Reggae', 'Hip-Hop', 'World Music']}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Textarea
                                        label="Event Description"
                                        name="description"
                                        value={eventDetails.description}
                                        onChange={handleInputChange}
                                        minRows={4}
                                        required
                                        className="mt-4"
                                    />
                                    <Textarea
                                        label="FAQ"
                                        name="faq"
                                        value={eventDetails.faq}
                                        onChange={handleInputChange}
                                        minRows={3}
                                        required
                                        className="mt-4"
                                    />
                                    <h1 className="font-bold mt-10">Venue</h1>
                                    <span className="font-light">Choose the perfect backdrop for your event by picking a venue and setting the date. Create an ambiance that matches your vision and ensures a memorable gathering.</span>
                                    <Select
                                        label="Venue"
                                        name="venue"
                                        onChange={handleVenueChange}
                                        data={venues.map((venue) => ({
                                            value: venue.venueid.toString(),
                                            label: venue.name,
                                        }))}
                                        required
                                        className="mt-8"
                                    />
                                    <div className="h-[480px] mt-4 pb-6">
                                        <span className={`inline-block text-[0.875rem] font-medium mb-1`}>Event Date</span>
                                        {newEvents.length === 0 && (
                                            <span className="text-red-500"> *</span>
                                        )}
                                        {eventDetails.venue_id === '' && (
                                            <Text size="sm" c="red" fw={500} className="inline-block pl-2">Please Select Venue First *</Text>
                                        )}
                                        <Calendar
                                            className={styles.calendar}
                                            localizer={localizer}
                                            events={allEvents}
                                            views={['month', 'week', 'day']}
                                            minDate={moment().toDate()}
                                            defaultDate={moment().toDate()} // Set the initial date to today
                                            onSelectEvent={handleSelectEvent}
                                            date={calendarDate}
                                            onNavigate={onNavigate}
                                            onSelectSlot={handleSelectSlot}
                                            view={currentView}
                                            onView={onView}
                                            startAccessor="start"
                                            endAccessor="end"
                                            selectable
                                            components={{ toolbar: (props: JSX.IntrinsicAttributes & { label: any; onView: any; onNavigate: any; currentView: any; }) => <CustomToolbar {...props} currentView={currentView} /> }}
                                        />
                                    </div>
                                    <h1 className="font-bold mt-10">Pricing</h1>
                                    <span className="font-light text-size-lg">Unlock the Full Potential of Your Event: Craft Custom Ticket Pricing That Opens Doors to a World of Possibilities! Share Your Unique Pricing Strategy to Attract a Diverse Array of Attendees, Tailoring Their Experience to Perfection.</span>
                                    <div>
                                        <Text size="sm" className="mt-8 text-[0.875rem] font-medium inline-block">Category Pricings</Text>
                                        {eventDetails.venue_id === '' && (
                                            <div>
                                                <Text size="sm" c="red" fw={500} className="inline-block pl-2">Please Select Venue First *</Text>
                                                <Slider disabled />
                                            </div>
                                        )}
                                        {categoryPricing.map((value, index) => (
                                            <div key={index}>
                                                <Text size="sm">{value.category}</Text>
                                                <Slider
                                                    min={0}
                                                    max={500}
                                                    value={categoryPricing.find((item) => item.category === value.category)?.price}
                                                    onChange={(newValue) => handleSliderChange(value.category, newValue)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Textarea
                                        label="Ticket Pricing Details"
                                        name="ticket_pricing"
                                        value={eventDetails.ticket_pricing}
                                        onChange={handleInputChange}
                                        minRows={3}
                                        required
                                        className="mt-4"
                                    />
                                    <h1 className="font-bold text-size-lg mt-8">Additional Information</h1>
                                    <span className="font-light text-size-lg">Share your extras! Tell us about special policies, or any unique needs. We're all ears! Your input helps us tailor your experience to your specific needs and preferences. Plus, Don't Forget to Add an Eye-Catching Event Banner to Spark Excitement and Anticipation!</span>
                                    <Textarea
                                        label="Admission Policy"
                                        name="admission_policy"
                                        value={eventDetails.admission_policy}
                                        onChange={handleInputChange}
                                        minRows={3}
                                        required
                                        className="mt-4"
                                    />
                                    <div className="mt-4">
                                        <FileInput type="file" accept="image/png,image/jpeg" onChange={setEventImage} icon={<IconUpload className="size[1rem]" />} label="Upload Event Banner Image" placeholder="Click Me to Upload: .png, .jpeg" required />
                                    </div>
                                    <h1 className="font-bold mt-10">NFT Tokens</h1>
                                    <span className="font-light">Make Your Event Memorable! Personalize it with Your Unique NFTs, From Flying Cats to Rainbow Wonders – Let Your Imagination Soar!</span>
                                    <div className="mt-8 flex flex-col md:flex-row">
                                        {/* <TextInput
                                            type="text"
                                            placeholder="Enter Event Name"
                                            value={eventNameUpload}
                                            onChange={handleUploadChange}
                                        /> */}
                                        <div className="md:w-1/2 w-full md:pr-6">
                                            <FileInput type="button" accept="image/png,image/jpeg" onChange={setSeatNFT} icon={<IconUpload className="size[1rem]" />} label="Upload NFT image for Seating" placeholder="Click Me to Upload: .png, .jpeg" required />
                                        </div>
                                        <div className="md:w-1/2 w-full md:pl-6">
                                            <FileInput type="button" accept="image/png,image/jpeg" onChange={setStandingNFT} icon={<IconUpload className="size[1rem] " />} label="Upload NFT image for Standing" placeholder="Click Me to Upload: .png, .jpeg" required />
                                        </div>
                                        {/* <Button onClick={handleFileUpload}>Upload File</Button> */}
                                    </div>
                                </div>
                                <Group className="mt-12 flex justify-between">
                                    <Link href="/creators"><Button>Back to Dashboard</Button></Link>
                                    <Button type="submit" variant="filled" color="blue" className="ml-auto">
                                        Create Event
                                    </Button>
                                </Group>
                            </form>




            {/* <div className="mb-4">
                            <h1>Upload JSON</h1>
                            <TextInput
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
                            <TextInput
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
                        </div> */}
          </Section>
        )}
      </LandingLayout>
    </>
  );
}

function CustomToolbar({ label, onView, onNavigate, currentView }) {
  return (
    <div className="rbc-toolbar !text-xs">
      <span className="rbc-btn-group">
        <button
          type="button"
          className="!px-[0.5rem]"
          onClick={() => onNavigate("PREV")}
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className="!px-[0.5rem]"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </button>
        <button
          type="button"
          className="!px-[0.5rem]"
          onClick={() => onNavigate("NEXT")}
        >
          <FaChevronRight />
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button
          type="button"
          className={currentView === Views.MONTH ? "!bg-gray-200" : ""}
          onClick={() => onView(Views.MONTH)}
        >
          Month
        </button>
        <button
          type="button"
          className={currentView === Views.WEEK ? "!bg-gray-200" : ""}
          onClick={() => onView(Views.WEEK)}
        >
          Week
        </button>
        <button
          type="button"
          className={currentView === Views.DAY ? "!bg-gray-200" : ""}
          onClick={() => onView(Views.DAY)}
        >
          Day
        </button>
      </span>
    </div>
  );
}
