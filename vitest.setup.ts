import '@/utils/moks/useNavigateMock';
import '@testing-library/jest-dom';
import { server } from './src/utils/moks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
