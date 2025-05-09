import { d as useNuxtApp } from './server.mjs';

const useSupabaseClient = () => {
  return useNuxtApp().$supabase.client;
};

export { useSupabaseClient as u };
//# sourceMappingURL=useSupabaseClient-CKQ8h17k.mjs.map
