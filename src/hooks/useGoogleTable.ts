import axios from 'axios'

const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_DB

export const useGoogleTable = async (
  name: string,
  email: string,
  link: string
) => {
  const data = await axios
    .create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .post(
      GOOGLE_SHEETS_API_KEY,
      JSON.stringify({
        json: [
          {
            name: name,
            email: email,
            link: link,
          },
        ],
      })
    )

  return data
}
