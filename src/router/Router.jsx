import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Finance from '../pages/Finance';
import Overview from '../pages/Overview';
import Calender from '../pages/Calender';
import Event from '../pages/Event';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Finance />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/events" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}
