import { supabase } from "./supabase";

export const getLeaderboards = async () => {
  try {
    const { data, error } = supabase.from("leaderboards").select("*").order("score", { ascending: false }).limit(5);

    if (error) {
      console.error(`Error fetching top 5 results: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

export const updateLeaderboard = async (userEmail, newScore, correctAnswers, timeElapsed) => {
  try {
    const { data: existing } = await supabase.from("leaderboards").select("score").eq("user_email", userEmail).single();

    if (!existing || newScore > existing.score) {
      const { data, error } = await supabase.from("leaderboards").upsert(
        {
          user_email: userEmail,
          score: newScore,
          correct: correctAnswers,
          time: timeElapsed,
        },
        {
          onConflict: "user_email",
        },
      );

      if (error) {
        console.error(`Error upserting data: ${error.message}`);
      }

      return { success: true, message: "New high score!" };
    }

    return { success: false, message: "Keep trying! Not a high score" };
  } catch (err) {
    console.error(`Leaderboard error: ${err.message}`);
  }
};
