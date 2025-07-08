import { BASE_URL } from '@/sources/constants';
import axios from 'axios';

export const baseApi = axios.create({ baseURL: BASE_URL });
