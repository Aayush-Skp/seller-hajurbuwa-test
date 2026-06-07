import React from 'react';
import { DetailCard, DetailRow } from './OrderDetailCard';

const ShippingDetails = ({ order }: { order: any }) => {
  return (
    <DetailCard title="Shipping Address">
      <DetailRow label="Name" value={order.buyer_name} />
      <DetailRow label="State" value={order.shipping_state} />
      <DetailRow label="City" value={order.shipping_city} />
      <DetailRow label="Area" value={order.shipping_area} />
      <DetailRow label="Address" value={order.shipping_address_1} />
      <DetailRow label="Address 2" value={order.shipping_address_2} />
      <DetailRow label="Phone" value={order.shipping_phone_number} />
      <DetailRow
        label="Alt. Phone"
        value={order.shipping_alternative_phone}
      />
    </DetailCard>
  );
};

export default ShippingDetails;
