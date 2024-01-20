import { Heading } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import InfoUserCard from 'components/InfoUserCard';
import ProfileCard from 'components/ProfileCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useParams } from 'react-router-dom';
import { useGetEventsByCreatorIdQuery } from 'services/eventApi';
import { useGetUserByIdQuery } from 'services/userApi';

const UserPage = () => {
    const { userId } = useParams();
    const { data: user, isSuccess: isUserSuccess, error } = useGetUserByIdQuery(userId);
    const { data: events, isSuccess: isEventsSuccess } = useGetEventsByCreatorIdQuery(userId);

    if (!isUserSuccess || !isEventsSuccess) return <Loader />;
    if (error) {
        <Heading textAlign='center' pt={6}>
            User profile is not found
        </Heading>;
    }

    return (
        <PageLayout>
            <ProfileCard bgPhotoUrl={null} {...user} />
            <InfoUserCard
                title='About'
                content={user.description}
                noItemsText='User has no description'
            />
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    items={events.map((event) => (
                        <EditEventCard
                            key={event.id}
                            {...event}
                            showActions={false}
                            bgColor='default'
                        />
                    ))}
                    noItemsText='You have no events'
                />
            )}
        </PageLayout>
    );
};

export default UserPage;
