import { supabase } from "./supabase";

export const getQuestions = async () => {
  try {
    const { data, error } = await supabase.from("questions").select("*");
    console.log("Supabase Fetch Result:", { data, error });

    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
