import { Box, Container, Typography } from '@mui/material'
import { useGetSingleRoom } from 'api/rooms'
import PageTitle from 'components/PageTitle'
import ScrollTop from 'components/ScrollTop'
import React from 'react'
import { useParams } from 'react-router'
import SingleRoomPage from 'sections/rooms/SingleRoomPage'

const RoomDetails = () => {
  const { roomId } = useParams()

  const { room, roomLoading } = useGetSingleRoom(roomId)

  const {
    roomName
  } = room || {}

  return (
    <React.Fragment>
      <ScrollTop />
      <PageTitle title={roomName} isOnportal={false} />
      <Container sx={{ my: 2 }}>
        <SingleRoomPage
          roomData={room}
          loading={roomLoading}
          isOnPortal={false}
        />
      </Container>
    </React.Fragment>
  )
}

export default RoomDetails