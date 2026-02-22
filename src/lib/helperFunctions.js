export const calculatePercentage = (part, whole) => (part / whole) * 100;

export const formatTimeMinutes = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${displaySeconds}`;
};

export const formatTimeHours = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const displayHours = String(hours).padStart(2, "0");
  const displayMinutes = String(minutes).padStart(2, "0");
  const displaySeconds = String(seconds).padStart(2, "0");

  return `${displayHours}:${displayMinutes}:${displaySeconds}`;
};
