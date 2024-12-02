import Breadcrumbs from 'components/@extended/Breadcrumbs';
import PageTitle from 'components/PageTitle'
import { APP_DEFAULT_PATH } from 'config/cofig';
import React from 'react'
import RoomReservationsTable from 'sections/portal/modules/reservations/RoomReservationsTable';

let breadcrumbLinks = [
  { title: 'Home', to: APP_DEFAULT_PATH },
  { title: 'Room Reservations' }
];

const RoomReservations = () => {
  return (
    <React.Fragment>
      <PageTitle title='Room Reservations' />
      <Breadcrumbs
        custom
        heading="Rooms Reservations"
        links={breadcrumbLinks}
        subheading="Pacific Sky Beach Resort Room Reservations"
      />
      <RoomReservationsTable />
    </React.Fragment>
  )
}

export default RoomReservations