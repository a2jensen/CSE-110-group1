'use client'
import { randomInt } from 'crypto';
import React, { useState } from 'react';
import { event } from '../../types';

// move this into types.ts
type AddEventFormProps = {
    onAddEvent: (event: event) => void;
};

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventInfo, setEventInfo] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({ name: eventTitle, description: eventInfo, id: 5, date: new Date(eventDate) });
        setEventTitle('');
        setEventInfo('');
        setEventDate('');
    };

    return (
        <div className="bg-white p-5 rounded-[10px] shadow-md max-w-[400px] self-start">
            <h2 className="text-[1.8em] font-bold text-[#FFD54F] mb-5">Add New Event</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                <label className="text-[0.9em] font-bold text-[#333]">Event Title</label>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333]"
                />

                <label className="text-[0.9em] font-bold text-[#333]">Event Info</label>
                <input
                    type="text"
                    placeholder="Event Info"
                    value={eventInfo}
                    onChange={(e) => setEventInfo(e.target.value)}
                    className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333]"
                />

                <label className="text-[0.9em] font-bold text-[#333]">Event Date (Calendar OR Manual Input)</label>
                <div className="flex items-center relative">
                    <input
                        type="date"
                        placeholder="Due Date (MM/DD/YYYY)"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333] flex-1"
                    />
                </div>
                <button type="submit" className="p-2.5 text-[1em] font-bold bg-[#FFD54F] border-none rounded-[20px] cursor-pointer text-white text-center hover:bg-[#FFC107]">Add</button>
            </form>
        </div>
    );
};

export default AddEventForm;