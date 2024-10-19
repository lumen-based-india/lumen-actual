import { supabase } from "./companies";

export const getAllInsetPrograms = async () => {
  const { data, error } = await supabase
    .from("insetprogram")
    .select(`*, companies(*)`);
  return { data, error };
};

export const getCurrentInsetProgram = async (id: string) => {
  const { data, error } = await supabase
    .from("insetProgram")
    .select(`*`)
    .eq("id", id);
  return { data, error };
};
