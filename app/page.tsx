import Card from 'components/card';
import demoData from 'data/demo';

import { getSubscriptions } from './actions/subscriptions';
import { getUser } from './actions/user';

export default async function Page() {
  const [user, subscriptions] = await Promise.all([await getUser(), await getSubscriptions()]);
  // sleep 10secs
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <main className="flex flex-col mt-10">
      <Card user={user} subscriptions={user?.email ? subscriptions : demoData} />
    </main>
  );
}
