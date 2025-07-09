import { createClient } from '@/utils/supabase/server';
import PriceCards from '@/components/PriceCards';

export default async function page() {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser()
    if (!user) {
        return null;
    }
  return (
    <div>
      {user && <PriceCards
        user={user}
      />}

      {!user && "could not find user"}
    </div>
  )
}
