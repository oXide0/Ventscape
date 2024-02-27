import AllEventsPage from 'pages/AllEventsPage';
import ChatPage from 'pages/ChatPage';
import CreateEventPage from 'pages/CreateEventPage';
import EditEventPage from 'pages/EditEventPage';
import EditProfilePage from 'pages/EditProfilePage';
import InProgressPage from 'pages/InProgressPage';
import LoginPage from 'pages/LoginPage';
import MyEventsPage from 'pages/MyEventsPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import StartPage from 'pages/StartPage';
import UserEventsPage from 'pages/UserEventsPage';
import UserPage from 'pages/UserPage';
import { createBrowserRouter } from 'react-router-dom';
import { AuthenticatedRoutes, CreatorRoutes, UnauthenticatedRoutes } from 'routes/AuthProviders';
import Layout from 'routes/Layout';

const AuthRoutesElements = [
    { path: 'login', Component: LoginPage },
    { path: 'register', Component: RegisterPage }
];

const AllRoutesElements = [
    { path: 'profile', Component: ProfilePage },
    { path: 'profile/edit', Component: EditProfilePage },
    { path: 'progress', Component: InProgressPage },
    { path: 'user/:userId/events', Component: UserEventsPage },
    { path: 'chat', Component: ChatPage }
];

const CreatorRoutesElements = [
    { path: 'events/create', Component: CreateEventPage },
    { path: 'events/my', Component: MyEventsPage },
    { path: 'events/edit/:eventId', Component: EditEventPage }
];

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: StartPage },
            { path: 'events', Component: AllEventsPage },
            { path: 'user/:userId', Component: UserPage },
            {
                Component: AuthenticatedRoutes,
                children: AuthRoutesElements
            },
            {
                Component: UnauthenticatedRoutes,
                children: [
                    ...AllRoutesElements,
                    {
                        Component: CreatorRoutes,
                        children: CreatorRoutesElements
                    }
                ]
            }
        ]
    }
]);
