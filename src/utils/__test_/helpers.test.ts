import { convertSecondsToTimeString } from '../helpers';

it('should return correct time string', () => {
  let seconds = 10;
  expect(convertSecondsToTimeString(seconds)).toBe('00:00:10');
  seconds = 70;
  expect(convertSecondsToTimeString(seconds)).toBe('00:01:10');
  seconds = 3600;
  expect(convertSecondsToTimeString(seconds)).toBe('01:00:00');
  seconds = 3661;
  expect(convertSecondsToTimeString(seconds)).toBe('01:01:01');
  seconds = 7330;
  expect(convertSecondsToTimeString(seconds)).toBe('02:02:10');
  seconds = -1;
  expect(convertSecondsToTimeString(seconds)).toBe('00:00:00');
});
