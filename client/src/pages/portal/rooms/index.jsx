import React from 'react'
import PageTitle from 'components/PageTitle'
import { APP_DEFAULT_PATH } from 'config/cofig';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import RoomsList from 'sections/portal/modules/rooms/RoomsList';

let breadcrumbLinks = [
  { title: 'Home', to: APP_DEFAULT_PATH },
  { title: 'Rooms' }
];


const Rooms = () => {


  return (
    <React.Fragment>
      <PageTitle title='Rooms' />
      <Breadcrumbs
        custom
        heading="Rooms"
        links={breadcrumbLinks}
        subheading="Pacific Sky Beach Resort Rooms"
      />
      <RoomsList />
    </React.Fragment>
  )
}

export default Rooms