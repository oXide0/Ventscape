import CreateEventPage from 'pages/CreateEventPage';
import EditEventPage from 'pages/EditEventPage';
import EventsPage from 'pages/EventsPage';
import LoginPage from 'pages/LoginPage';
// import MyEventsPage from 'pages/MyEventsPage';
import RegisterPage from 'pages/RegisterPage';
// import ProfilePage from 'pages/ProfilePage';
import StartPage from 'pages/StartPage';
// import UserPage from 'pages/UserPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RequireAuth, RequireAuthProvider } from 'routes/AuthProviders';
import CreatorAuth from 'routes/CreatorAuth';
import Layout from 'routes/Layout';
// import EditProfilePage from 'pages/EditProfilePage';
// import InProgressPage from 'pages/InProgressPage';
// import AiPage from 'pages/AIPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path='events' element={<EventsPage />} />
            {/* <Route path='user/:userId' element={<UserPage />} /> */}
            <Route element={<RequireAuthProvider />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
            </Route>
            <Route element={<RequireAuth />}>
                {/* <Route path='profile' element={<ProfilePage />} />
                <Route path='profile/edit' element={<EditProfilePage />} />
                <Route path='ai-chat' element={<InProgressPage />} /> */}
                <Route element={<CreatorAuth />}>
                    <Route path='events/create' element={<CreateEventPage />} />
                    {/* <Route path='events/my' element={<MyEventsPage />} /> */}
                    <Route path='events/edit/:eventId' element={<EditEventPage />} />
                </Route>
            </Route>
        </Route>
    )
);
