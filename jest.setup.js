import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder globally
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;