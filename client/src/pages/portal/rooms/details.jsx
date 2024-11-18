import { useGetSingleRoom } from 'api/rooms';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import PageTitle from 'components/PageTitle';
import { APP_DEFAULT_PATH } from 'config/cofig';
import React from 'react'
import { useParams } from 'react-router';
import SingleRoomPage from 'sections/rooms/SingleRoomPage';

const RoomDetails = () => {
  const { roomId } = useParams()

  const { room, roomLoading } = useGetSingleRoom(roomId)
  const { roomName, roomType } = room || {}

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Rooms', to: '/portal/rooms' },
    { title: roomName },
  ];

  return (
    <React.Fragment>
      <PageTitle title={roomName} />
      <Breadcrumbs
        custom
        heading={roomName}
        links={breadcrumbLinks}
        subheading={roomType}
      />
      <SingleRoomPage
        roomData={room}
        loading={roomLoading}
      />
    </React.Fragment>
  )
}

export default RoomDetails