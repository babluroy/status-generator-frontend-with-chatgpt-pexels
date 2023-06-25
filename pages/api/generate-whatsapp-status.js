import axios from 'axios';

export default async function handler(req, res) {
  let payload = 'Generate ' +  req.body.topic + ' whatsapp status' + ',generate 10 status';
  if (req.body?.isLimitedChar) {
    payload += ' under 149 characters';
  }
  try {
    const options = {
      method: 'POST',
      url: 'https://openai80.p.rapidapi.com/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
        'Accept-Encoding': '*'
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: payload
          }
        ]
      }
    };
    const response = await axios.request(options)
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong'});
  }
}
