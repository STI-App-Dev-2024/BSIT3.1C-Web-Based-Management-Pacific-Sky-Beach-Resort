import React from 'react'
import PageTitle from 'components/PageTitle'
import StaffsTable from 'sections/portal/modules/staffs/StaffsTable'
import { APP_DEFAULT_PATH } from 'config/cofig';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

let breadcrumbLinks = [
  { title: 'Home', to: APP_DEFAULT_PATH },
  { title: 'Staffs' }
];

const Staffs = () => {
  return (
    <React.Fragment>
      <PageTitle title='Staffs' />
      <Breadcrumbs
        custom
        heading="Staffs"
        links={breadcrumbLinks}
        subheading="Pacific Sky Beach Resort Team"
      />
      <StaffsTable />
    </React.Fragment>
  )
}

export default Staffs