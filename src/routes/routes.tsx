import CreateEventPage from 'pages/CreateEventPage';
import EditEventPage from 'pages/EditEventPage';
import EventsPage from 'pages/EventsPage';
import LoginPage from 'pages/LoginPage';
import MyEventsPage from 'pages/MyEventsPage';
import RegisterPage from 'pages/RegisterPage';
import SettingsPage from 'pages/SettingsPage';
import StartPage from 'pages/StartPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import CreatorAuth from './CreatorAuth';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
// import InProgressPage from 'pages/InProgressPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route element={<RequireAuth />}>
                <Route path='events' element={<EventsPage />} />
                <Route element={<CreatorAuth />}>
                    <Route path='events/create' element={<CreateEventPage />} />
                    <Route path='events/my' element={<MyEventsPage />} />
                    <Route path='events/edit/:eventId' element={<EditEventPage />} />
                </Route>
                <Route path='settings' element={<SettingsPage />} />
            </Route>
        </Route>
    )
);
