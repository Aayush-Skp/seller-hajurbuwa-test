import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/common/Loader';

function OrderRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.order_id) {
      router.replace(`/order-management/${router.query.order_id}`);
    }
  }, [router.query.order_id, router]);

  return <Loader />;
}

export default OrderRedirect;
