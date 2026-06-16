import { useEffect, useState } from "react";
import e2 from "../assets/Firework.png";
import e3 from "../assets/Music.png";
import { events as eventsData } from "../data/content";

interface EventItem {
  id: number;
  title: string;
  date?: string;
  venue?: string;
  decription?: string;
  time?: string;
  ticketlink?: string;
  Image: string;
}

const AllEvents = () => {
  const [events] = useState<EventItem[]>(eventsData as EventItem[]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

 useEffect(() => {
  const body = document.body;

  if (selectedEvent) {
    body.classList.add('no-scroll');
  } else {
    body.classList.remove('no-scroll');
  }

  return () => {
    body.classList.remove('no-scroll');
  };
}, [selectedEvent]);

  return (
    <>

      <section className="relative overflow-hidden pt-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(66,179,245,.35) 0%, rgba(66,179,245,.55) 60%, rgba(51,119,255,.7) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px)",
            backgroundSize: "24px 24px, 30px 30px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h1 className="yeseva text-[2.4rem] md:text-6xl font-extrabold tracking-wide text-[#0f1f3a] drop-shadow-sm">
            CVGCA Events
          </h1>
          <p className="mt-2 text-[#0f1f3a]/80 max-w-2xl">
            Explore our upcoming and past events
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)",
          }}
        />
      </section>

      <h1 className="text-6xl max-w-[80rem] mt-10 mx-auto crimson">Cultural Events</h1>

      <div className="bg-white min-h-screen py-12 px-6">
        <img
          src={e3}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[40rem] top-[5rem] w-[330px]
      opacity-100 drop-shadow-xl rotate-[0deg] z-10
    "
        />
        <img
          src={e2}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[5rem] top-[1rem] w-[400px]
      opacity-100 drop-shadow-xl rotate-[-20deg] z-10
    "
        />
        <img
          src={e2}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[20rem] top-[8rem] w-[300px]
      opacity-100 drop-shadow-xl rotate-[-20deg] z-10
    "
        />

        <div className="max-w-[80rem] mx-auto space-y-10">
          {events.length > 0 ? (events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="md:w-1/2 w-full h-64 md:h-auto">
                <img
                  src={event.Image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 w-full p-6 flex flex-col justify-between relative">
                <div>
                  <h2 className="text-4xl font-semibold yeseva text-gray-900 mb-3">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{event.decription}</p>
                  <div className="w-3/4 h-[1px] bg-gray-300 mb-4"></div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>Venue:</strong> {event.venue || "Not confirmed"}
                    </p>
                    <p>
                      <strong>Date:</strong> {event.date || "Not confirmed"}
                    </p>
                    <p>
                      <strong>Time:</strong> {event.time || "Not confirmed"}
                    </p>
                  </div>
                </div>
              </div>
              <div
  className={`w-[3rem] flex items-center justify-center bg-opacity-80 border-dashed border-2 border-white
    ${event.ticketlink ? "bg-black cursor-pointer" : "bg-black cursor-not-allowed"}`}
  onClick={(e) => {
    e.stopPropagation();
    if (event.ticketlink) window.open(event.ticketlink, "_blank");
  }}
>
  <span className="block transform -rotate-90 whitespace-nowrap text-[1.2rem] font-semibold tracking-wide text-white ">
    {event.ticketlink ? "Get Ticket" : "No Ticket at the Moment"}
  </span>
</div>
            </div>
          ))) : (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-10 text-center text-gray-600">
      <h2 className="text-2xl font-semibold yeseva mb-2">No Events</h2>
      <p>Please come back later.</p>
    </div>
  )}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/30 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 pt-7 relative shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-0 right-2 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <img
              src={selectedEvent.Image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />

            <h2 className="text-3xl font-bold yeseva mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-700 mb-4">{selectedEvent.decription}</p>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <strong>Venue:</strong> {selectedEvent.venue || "Not confirmed"}
              </p>
              <p>
                <strong>Date:</strong> {selectedEvent.date || "Not confirmed"}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time || "Not confirmed"}
              </p>
            </div>

            {selectedEvent.ticketlink ? (
                <a
                href={selectedEvent.ticketlink}
                className="inline-block bg-black text-white px-6 py-2 rounded-[.4rem] text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Your Ticket
              </a>
            ) : (
              <a className="text-gray-400 italic">
                No ticket available at the moment. Please check back later.
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;
