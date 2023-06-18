import { expect, test } from 'vitest';
import { joinArraysById } from './joinArrayItemsById';

test('should return an empty array when both inputs are empty', () => {
  const result = joinArraysById([], []);
  expect(result).toEqual([]);
});

test('should return an empty array when arr1 is empty', () => {
  const result = joinArraysById([], [{ id: '1' }]);
  expect(result).toEqual([]);
});

test('should return arr1 when arr2 is empty', () => {
  const arr1 = [{ id: '1' }];
  const result = joinArraysById(arr1, []);
  expect(result).toEqual(arr1);
});

test('should merge items with matching ids', () => {
  const arr1 = [{ id: '1', name: 'Item 1' }];
  const arr2 = [{ id: '1', extra: 'Extra Info' }];
  const result = joinArraysById(arr1, arr2);
  expect(result).toEqual([{ id: '1', name: 'Item 1', extra: 'Extra Info' }]);
});

test('should not merge items with non-matching ids', () => {
  const arr1 = [{ id: '1', name: 'Item 1' }];
  const arr2 = [{ id: '2', extra: 'Extra Info' }];
  const result = joinArraysById(arr1, arr2);
  expect(result).toEqual(arr1);
});
