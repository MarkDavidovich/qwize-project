export const calculatePercentage = (part, whole) => (part / whole) * 100;

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${displaySeconds}`;
};
