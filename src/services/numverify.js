import axios from 'axios';

export const verfiyPhoneNumber = async (number, country_code) => {
  const url = `http://apilayer.net/api/validate?access_key=fffb5c2b6b8a5370c13c500196d9e115&number=${number}&country_code=${country_code}&format=1`;

  const result = await axios.get(url);
  return result;
}
