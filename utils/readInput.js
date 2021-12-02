import { readFileSync } from 'fs';
import { resolve } from 'path';

export default function readInput(filename) {
  const __dirname = resolve();
  if (filename.substring(filename.length - 4) !== '.txt') filename += '.txt';
  return readFileSync(resolve(__dirname, '..', 'inputs', filename), 'utf-8');
}