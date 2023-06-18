import { describe, it, expect } from 'vitest'
import ComputeLevenshteinDistance from '../sortingAlg'

describe('ComputeLevenshteinDistance', () => {
    describe('Distance', () => {
      it('should return the correct distance between two strings', () => {
        expect(ComputeLevenshteinDistance.Distance('book', 'back')).toBe(2);
      });

      it('should return the correct distance between empty and string', () => {
        expect(ComputeLevenshteinDistance.Distance('', 'xyz')).toBe(3);
      });

      it('should return the correct distance between the same strings', () => {
        expect(ComputeLevenshteinDistance.Distance('xyz', 'xyz')).toBe(0);
      });

      it('should return the correct distance between null and string', () => {
        expect(ComputeLevenshteinDistance.Distance(null, 'xyz')).toBe(3);
      });

      it('should return the correct distance between string and null', () => {
        expect(ComputeLevenshteinDistance.Distance('xyz', null)).toBe(3);
      });

      it('should return undefined comparing two null values', () => {
        expect(ComputeLevenshteinDistance.Distance(null, null)).toBe(undefined);
      });

    });
  
    describe('CalculateSimilarity', () => {
      it('should return the correct similarity between two strings', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity('kitten', 'sitting')).toBeCloseTo(0.57, 2);
      });

      it('should return the correct distance between same strings', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity('xyz', 'xyz')).toBeCloseTo(1.0, 2);
       
      });

      it('should return the correct distance between empty and string', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity('', 'xyz')).toBeCloseTo(0.0, 2)
      });
      
      it('should return the correct distance between null and string', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity(null, 'xyz')).toBeCloseTo(0.0, 2)
      });

      it('should return the correct distance between string and null', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity('xyz', null)).toBeCloseTo(0.0, 2)
      });

      it('should return the correct distance between null and null', () => {
        expect(ComputeLevenshteinDistance.CalculateSimilarity(null, null)).toBeCloseTo(0.0, 2)
      });

    });
  });