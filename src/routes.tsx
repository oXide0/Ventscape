import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from 'hoc/Layout';
import RequireAuth from 'hoc/RequireAuth';
import CreatorAuth from 'hoc/CreatorAuth';
import Test from 'pages/Test';
import HomePage from 'pages/HomePage/HomePage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import EventsPage from 'pages/EventsPage/EventsPage';
import CreateEventPage from 'pages/CreateEventPage/CreateEventPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import EventPage from 'pages/EventPage/EventPage';
import MyEventsPage from 'pages/MyEventsPage/MyEventsPage';
import EditEventPage from 'pages/EditEventPage/EditEventPage';
import FavoriteEventsPage from 'pages/FavoriteEventsPage/FavoriteEventsPage';
import NotificationsPage from 'pages/NotificationsPage/NotificationsPage';
import ProgressPage from 'pages/ProgressPage/ProgressPage';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path='signup' element={<SignUpPage />} />
			<Route path='login' element={<LoginPage />} />
			<Route path='test' element={<Test />} />
			<Route path='events' element={<EventsPage />} />
			<Route element={<RequireAuth />}>
				<Route path='profile' element={<ProfilePage />} />
				<Route path='notifications' element={<NotificationsPage />} />
				<Route path='events/favorite' element={<FavoriteEventsPage />} />
				<Route path='events/:id' element={<EventPage />} />
				<Route path='events/edit/:id' element={<EditEventPage />} />
				<Route path='settings' element={<ProgressPage />} />
				<Route element={<CreatorAuth />}>
					<Route path='events/create' element={<CreateEventPage />} />
					<Route path='events/my' element={<MyEventsPage />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Route>
	)
);
