import {
  convertSecondsToTimeString,
  convertTimeValueToSecond,
  checkOverlapTimeRange,
} from '../helpers';

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

it('should return correct second value', () => {
  let hour = 0;
  let minute = 10;
  let second = 2;
  expect(convertTimeValueToSecond({ hour, minute, second })).toBe(602);
  hour = 1;
  minute = 2;
  second = 8;
  expect(convertTimeValueToSecond({ hour, minute, second })).toBe(3728);
});

it('should check overlap ranges correct', () => {
  let range1 = { start: 0, end: 100 };
  let range2 = { start: 10, end: 60 };
  expect(checkOverlapTimeRange(range1, range2)).toBeTruthy();
  range1 = { start: 0, end: 100 };
  range2 = { start: 0, end: 100 };
  expect(checkOverlapTimeRange(range1, range2)).toBeTruthy();
  range1 = { start: 100, end: 200 };
  range2 = { start: 200, end: 300 };
  expect(checkOverlapTimeRange(range1, range2)).toBeFalsy();
  range1 = { start: 100, end: 200 };
  range2 = { start: 100, end: 300 };
  expect(checkOverlapTimeRange(range1, range2)).toBeTruthy();
  range1 = { start: 100, end: 200 };
  range2 = { start: 150, end: 200 };
  expect(checkOverlapTimeRange(range1, range2)).toBeTruthy();
  range1 = { start: 100, end: 200 };
  range2 = { start: 0, end: 100 };
  expect(checkOverlapTimeRange(range1, range2)).toBeFalsy();
  range1 = { start: 100, end: 200 };
  range2 = { start: 100, end: 200 };
  expect(checkOverlapTimeRange(range1, range2)).toBeTruthy();
});
