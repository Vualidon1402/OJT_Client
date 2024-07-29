import React, { useEffect, useState } from "react";
import "./EventComponent.scss";
import { DiscountEvent } from "@/store/slices/discountevent.slice";
import apis from "@/apis";

const EventComponent: React.FC = () => {
  const [events, setEvents] = useState<DiscountEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await apis.discount.discount();
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="event-container">
      <h2>Sự kiện giảm giá sắp diễn ra</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p className="event-date">
              Từ {new Date(event.startDate).toLocaleDateString()}
              đến {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="event-discount">
              Giảm giá {event.discountPercentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
