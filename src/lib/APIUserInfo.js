import { supabase } from "./supabase";

export const getUserInfo = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("user-info")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(`Error fetching user info: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

export const createUserInfo = async (userId, username) => {
  try {
    const { error } = await supabase.from("user-info").insert({
      user_id: userId,
      username: username,
      total_score: 0,
      total_time: 0,
      correct_answers: 0,
    });

    if (error) {
      console.error(`Error creating initial user info: ${error.message}`);
    }
  } catch (err) {
    console.error(`Error in createInitialUserInfo: ${err.message}`);
  }
};

export const updateUserInfo = async (userId, stats) => {
  const { totalScore, totalTime, correctAnswers } = stats;

  try {
    const currentInfo = await getUserInfo(userId);

    if (currentInfo) {
      const { error } = await supabase
        .from("user-info")
        .update({
          total_score: (currentInfo.total_score || 0) + totalScore,
          total_time: (currentInfo.total_time || 0) + totalTime,
          correct_answers: (currentInfo.correct_answers || 0) + correctAnswers,
        })
        .eq("user_id", userId);

      if (error) {
        console.error(`Error updating user info: ${error.message}`);
      }
    }
  } catch (err) {
    console.error(`Error updating cumulative stats: ${err.message}`);
  }
};
