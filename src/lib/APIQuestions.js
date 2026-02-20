import { supabase } from "./supabase";

export const getQuestions = async (difficulty, amount) => {
  try {
    // התחלת שאילתה בסיסית עם הגבלת כמות
    // התחלת שאילתה בסיסית. אנחנו מביאים pool גדול יותר של שאלות כדי לאפשר רנדומיזציה טובה יותר.
    // אם יש לנו הרבה שאלות, אולי כדאי להגדיל את ה-limit או להשתמש בשיטה אחרת.
    let query = supabase.from("questions").select("*");

    // סינון לפי קושי יתבצע רק אם הערך אינו "Remix"
    if (difficulty.toLowerCase() !== "remix") {
      query = query.eq("difficulty", difficulty.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    // ערבוב התוצאות כדי להבטיח רנדומליות
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // החזרת הכמות המבוקשת
    return shuffled.slice(0, amount);
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
