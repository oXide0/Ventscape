import { GoHome, GoHomeFill } from 'react-icons/go';
import { BiCalendarEvent, BiSolidCalendarEvent } from 'react-icons/bi';
import { MdOutlineEventAvailable, MdEventAvailable } from 'react-icons/md';
import {
	IoNotificationsOutline,
	IoNotificationsSharp,
	IoAddCircleOutline,
	IoAddCircleSharp,
	IoStatsChartOutline,
	IoStatsChartSharp,
} from 'react-icons/io5';
import { TypeIcon } from '../../../types/types';
import { PathMatch } from 'react-router-dom';

export const getIconFromName = (name: TypeIcon, active: PathMatch | null) => {
	switch (name) {
		case 'home':
			return active ? <GoHomeFill /> : <GoHome />;
		case 'events':
			return active ? <BiSolidCalendarEvent /> : <BiCalendarEvent />;
		case 'notifications':
			return active ? <IoNotificationsSharp /> : <IoNotificationsOutline />;
		case 'add-event':
			return active ? <IoAddCircleSharp /> : <IoAddCircleOutline />;
		case 'stats':
			return active ? <IoStatsChartSharp /> : <IoStatsChartOutline />;
		case 'my-events':
			return active ? <MdEventAvailable /> : <MdOutlineEventAvailable />;
		default:
			return null;
	}
};
