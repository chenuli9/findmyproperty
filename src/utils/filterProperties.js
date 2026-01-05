import { MONTHS } from './constants.js';

const convertPropertyDate = (added) => {
  const month = MONTHS[added.month] || 1;
  const day = added.day || 1;
  const year = added.year || 2022;
  // JavaScript Date months are 0-indexed, hence month - 1
  return new Date(year, month - 1, day);
};

/**
 * Utility function: extracts UK postcode area using regex pattern matching
 * Returns the area code (e.g., "BR5" from "BR5 1AA") for filtering purposes
 */
const extractPostcodeArea = (location) => {
  // Regex pattern matches UK postcode area format (1-2 letters followed by 1-2 digits)
  const match = location.match(/\b([A-Z]{1,2}\d{1,2})\b/);
  return match ? match[1] : '';
};

/**
 * Main filtering function: applies multiple filter criteria to property array
 * Implements a functional approach using Array.filter() with multiple conditions
 * Each filter is applied sequentially - property must pass all criteria to be included
 */
export const filterProperties = (properties, filters) => {
  // Input validation: return empty array if properties is invalid
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  // Early return: if no filters provided, return all properties
  if (!filters) {
    return properties;
  }

  // Filter function: returns true only if property matches all specified criteria
  return properties.filter(property => {
    // Property type filter - excludes 'any' option which means no filtering
    if (filters.type && filters.type !== 'any') {
      if (property.type !== filters.type) {
        return false;
      }
    }

    // Price range filtering: minPrice (lower bound)
    if (filters.minPrice && filters.minPrice !== '') {
      if (property.price < Number(filters.minPrice)) {
        return false;
      }
    }

    // Price range filtering: maxPrice (upper bound)
    if (filters.maxPrice && filters.maxPrice !== '') {
      if (property.price > Number(filters.maxPrice)) {
        return false;
      }
    }

    // Bedroom count filtering: range-based filtering similar to price
    if (filters.minBedrooms && filters.minBedrooms !== '') {
      if (property.bedrooms < Number(filters.minBedrooms)) {
        return false;
      }
    }

    if (filters.maxBedrooms && filters.maxBedrooms !== '') {
      if (property.bedrooms > Number(filters.maxBedrooms)) {
        return false;
      }
    }

    // Date range filtering: properties added after specified date
    if (filters.dateAfter) {
      const filterDate = new Date(filters.dateAfter);
      const propertyDate = convertPropertyDate(property.added);
      if (propertyDate < filterDate) {
        return false;
      }
    }

    // Date range filtering: properties added before specified date
    if (filters.dateBefore) {
      const filterDate = new Date(filters.dateBefore);
      const propertyDate = convertPropertyDate(property.added);
      if (propertyDate > filterDate) {
        return false;
      }
    }

    // Postcode area filtering: compares extracted postcode areas (case-insensitive)
    if (filters.postcodeArea && filters.postcodeArea.trim() !== '') {
      const propertyPostcode = extractPostcodeArea(property.location);
      const filterPostcode = filters.postcodeArea.trim().toUpperCase();
      if (propertyPostcode !== filterPostcode) {
        return false;
      }
    }

    // Property passes all filter criteria
    return true;
  });
};

