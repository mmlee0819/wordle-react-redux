export const options = {
  method: "GET",
  url: "https://random-words5.p.rapidapi.com/getRandom",
  params: { wordLength: "5" },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST,
  },
}
