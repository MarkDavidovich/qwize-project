import { supabase } from "./supabase";

export const getQuestions = async (difficulty, amount) => {
  try {
    // התחלת שאילתה בסיסית עם הגבלת כמות
    let query = supabase.from("questions").select("*").limit(amount); // הגבלת כמות השאלות

    // סינון לפי קושי יתבצע רק אם הערך אינו "Remix"
    // אנחנו מניחים שהערך מגיע תמיד מה-State של Home.jsx
    if (difficulty.toLowerCase() !== "remix") {
      query = query.eq("difficulty", difficulty.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    // ערבוב התוצאות כדי להבטיח רנדומליות בתוך הרמה שנבחרה
    // Math.random() - 0.5 מחזיר מספר בין 0.5 ל 0.5-
    // אם המספר חיובי, השאלה תישאר במקום
    // אם המספר שלילי, השאלה תעבור למקום אחר
    return data.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
