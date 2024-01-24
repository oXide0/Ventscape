import AllEventsPage from 'pages/AllEventsPage';
import CreateEventPage from 'pages/CreateEventPage';
import EditEventPage from 'pages/EditEventPage';
import EditProfilePage from 'pages/EditProfilePage';
import LoginPage from 'pages/LoginPage';
import MyEventsPage from 'pages/MyEventsPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import StartPage from 'pages/StartPage';
import UserPage from 'pages/UserPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthenticatedRoutes, CreatorRoutes, UnauthenticatedRoutes } from 'routes/AuthProviders';
import Layout from 'routes/Layout';
import InProgressPage from 'pages/InProgressPage';
import UserEventsPage from 'pages/UserEventsPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path='events' element={<AllEventsPage />} />
            <Route path='user/:userId' element={<UserPage />} />
            <Route element={<AuthenticatedRoutes />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
            </Route>
            <Route element={<UnauthenticatedRoutes />}>
                <Route path='profile' element={<ProfilePage />} />
                <Route path='profile/edit' element={<EditProfilePage />} />
                <Route path='progress' element={<InProgressPage />} />
                <Route path='user/:userId/events' element={<UserEventsPage />} />
                <Route element={<CreatorRoutes />}>
                    <Route path='events/create' element={<CreateEventPage />} />
                    <Route path='events/my' element={<MyEventsPage />} />
                    <Route path='events/edit/:eventId' element={<EditEventPage />} />
                </Route>
            </Route>
        </Route>
    )
);
