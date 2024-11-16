import React from 'react'
import PageTitle from 'components/PageTitle'
import { APP_DEFAULT_PATH } from 'config/cofig';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import Form from 'sections/portal/modules/rooms/RoomsForm';
import { useLocation } from 'react-router';
import FormWrapper from 'components/FormWrapper';

let breadcrumbLinks = [
  { title: 'Home', to: APP_DEFAULT_PATH },
  { title: 'Rooms', to: '/portal/rooms' },
  { title: 'Form' },
];

const RoomsForm = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const formMode = queryParams.get(`action`)
  const isAddMode = formMode.toLocaleLowerCase() === 'add'
  const isEditMode = formMode.toLocaleLowerCase() === 'edit'

  const pageTitle = isAddMode ? `Create` : `Edit`

  return (
    <React.Fragment>
      <PageTitle title={`${pageTitle} Room`} />
      <Breadcrumbs
        custom
        heading="Form"
        links={breadcrumbLinks}
        subheading="Add rooms to Pacific Sky Beach"
      />
      <Form />
    </React.Fragment>
  )
}

export default RoomsForm