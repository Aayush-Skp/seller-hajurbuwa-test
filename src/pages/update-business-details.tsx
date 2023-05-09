import React from 'react';
import UpdateBusinessDetails from '../components/login/updateBusinessInfo';
import authenticatedRoute from '../components/WithAuth';

function UpdateBusinessDetailsPage() {
  return (
    <div>
      <UpdateBusinessDetails />
    </div>
  );
}

export default authenticatedRoute(UpdateBusinessDetailsPage);
