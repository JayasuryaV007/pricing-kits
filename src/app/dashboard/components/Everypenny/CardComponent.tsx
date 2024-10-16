import React, { useMemo } from 'react';
import Tile from '~/core/ui/Tile';
import { ConvertToUSD } from '~/lib/subscriptions/convert-to-usd';

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

const CardComponent: React.FC<{ subscriptions: DataType[] }> = ({
  subscriptions,
}) => {
  const {
    totalCost,
    totalSubscriptions,
    activeSubscriptions,
    inactiveSubscriptions,
  } = useMemo(() => {
    const totalSubscriptions = subscriptions.length;
    const totalPrice = subscriptions.reduce(
      (sum, subscription) => sum + parseFloat(subscription.price || '0'),
      0,
    );

    const totalCost = ConvertToUSD(totalPrice).toFixed(2);
    const activeSubscriptions = subscriptions.filter(
      (sub) => sub.status === 'Active',
    ).length;
    const inactiveSubscriptions = totalSubscriptions - activeSubscriptions;

    return {
      totalCost,
      totalSubscriptions,
      activeSubscriptions,
      inactiveSubscriptions,
    };
  }, [subscriptions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4">
      <div className="">
        <Tile>
          <Tile.Heading>Total Subscription Cost</Tile.Heading>
          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{`$${totalCost}`}</Tile.Figure>
            </div>
          </Tile.Body>
        </Tile>
      </div>
      <div className="">
        <Tile>
          <Tile.Heading>Total Subscription</Tile.Heading>
          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{totalSubscriptions}</Tile.Figure>
            </div>
          </Tile.Body>
        </Tile>
      </div>
      <div className="">
        <Tile>
          <Tile.Heading>Active Subscription</Tile.Heading>
          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{activeSubscriptions}</Tile.Figure>
            </div>
          </Tile.Body>
        </Tile>
      </div>
      <div className="">
        <Tile>
          <Tile.Heading>Inactive Subscription</Tile.Heading>
          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{inactiveSubscriptions}</Tile.Figure>
            </div>
          </Tile.Body>
        </Tile>
      </div>
    </div>
  );
};

export default React.memo(CardComponent);
