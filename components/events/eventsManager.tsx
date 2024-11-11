'use client'
import UpcomingEvents from "@/components/events/upcomingEvents";
import AddEventForm from "@/components/events/addEventForm";
import styles from './eventsManager.module.css';
import { useState } from "react";
import { event } from "../../types";


export default function EventsManager() {
    const [events, setEvents] = useState<event[]>([
        { name: 'Movie Night', description: 'Join us for a movie!', id: 0, date: new Date() },
        { name: 'Dinner', description: 'Dinner gathering in the suite', id: 1, date: new Date() },
      ]);
    
      const handleAddEvent = (newEvent: event) => {
        setEvents([...events, newEvent]);
      };
    return (
        <div>
            <div className={styles.eventsManagerGrid}>
                <UpcomingEvents events={events} roomName="testRoom" />
                <AddEventForm onAddEvent={handleAddEvent}/>
            </div>
        </div>
    );
}