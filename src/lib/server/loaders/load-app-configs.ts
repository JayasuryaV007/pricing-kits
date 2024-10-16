import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/database.types';

export async function loadAppConfigs(
    client: SupabaseClient<Database>
  ) {
    //const client = getSupabaseServerComponentClient()
    console.log(client,"supabase client initialised")
    const { data, error } = await client
        .from('app_configs')
        .select('*')
    
    console.log("Data", data)
    if(error){      
        throw error;
    }
    console.log('Data fetched from app_configs:', data);
    return data;
  };