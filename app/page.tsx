"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from './dashboard/supabase/supabaseClient';

interface Call {
  from_number: string;
  to_number: string;
  summary: string;
  appointments_booked: number;
}

export default function HomePage() {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('from_number, to_number, summary, appointments_booked');

      if (error) {
        console.error('Error fetching calls:', error);
      } else if (data) {
        setCalls(data as Call[]);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main entry point of the application.</p>
      <h2>Call Details</h2>
      <ul>
        {calls.map((call, index) => (
          <li key={index}>
            From: {call.from_number}, To: {call.to_number}, Summary: {call.summary}, Appointments Booked: {call.appointments_booked}
          </li>
        ))}
      </ul>
    </div>
  );
} 