import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { vi } from 'vitest';

vi.mock('../../hooks/useAuth', () => ({
	useAuth: () => ({
		userType: 'creator',
	}),
}));

describe('NavBar component', () => {
	it('renders the component with navigation links for creator', () => {
		const { getByText } = render(
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>
		);

		expect(getByText('VENTSCAPE')).toBeInTheDocument();
		expect(getByText('Home')).toBeInTheDocument();
		expect(getByText('Events')).toBeInTheDocument();
		expect(getByText('Notifications')).toBeInTheDocument();
		expect(getByText('Add event')).toBeInTheDocument();
		expect(getByText('My events')).toBeInTheDocument();
		expect(getByText('Statistics')).toBeInTheDocument();
	});
});
