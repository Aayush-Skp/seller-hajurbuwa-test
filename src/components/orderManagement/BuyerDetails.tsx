import React from 'react';
import { DetailCard, DetailRow } from './OrderDetailCard';

const BuyerDetails = ({ order }: { order: any }) => {
  return (
    <DetailCard title="Buyer Details">
      <DetailRow
        label="Name"
        value={order.buyer_name || order.buyer_company_name}
      />
      <DetailRow label="Business" value={order.buyer_company_name} />
      <DetailRow label="Phone" value={order.buyer_phone_number} />
      <DetailRow label="Email" value={order.buyer_email} />
      <DetailRow label="PAN" value={order.buyer_pan_number || order.buyer_pan} />
    </DetailCard>
  );
};

export default BuyerDetails;
