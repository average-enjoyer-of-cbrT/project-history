import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import { events } from './data/events';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="mist-background"></div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {events.map(event => (
            <Route 
              key={event.id} 
              path={`/events/${event.id}`} 
              element={<EventPage eventId={event.id} />} 
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;