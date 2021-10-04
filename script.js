import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
};

const generateRandomId = () => {
  const min = 1;
  const max = 1000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function () {
  http.get(`http://localhost:3001/products/${generateRandomId()}/related`);
  sleep(1);
}
