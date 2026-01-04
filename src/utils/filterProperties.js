import { MONTHS } from './constants.js';

const convertPropertyDate = (added) => {
  const month = MONTHS[added.month] || 1;
  const day = added.day || 1;
  const year = added.year || 2022;
  return new Date(year, month - 1, day);
};

const extractPostcodeArea = (location) => {
  const match = location.match(/\b([A-Z]{1,2}\d{1,2})\b/);
  return match ? match[1] : '';
};

export const filterProperties = (properties, filters) => {
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  if (!filters) {
    return properties;
  }

  return properties.filter(property => {
    if (filters.type && filters.type !== 'any') {
      if (property.type !== filters.type) {
        return false;
      }
    }

    if (filters.minPrice && filters.minPrice !== '') {
      if (property.price < Number(filters.minPrice)) {
        return false;
      }
    }

    if (filters.maxPrice && filters.maxPrice !== '') {
      if (property.price > Number(filters.maxPrice)) {
        return false;
      }
    }

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

    if (filters.dateAfter) {
      const filterDate = new Date(filters.dateAfter);
      const propertyDate = convertPropertyDate(property.added);
      if (propertyDate < filterDate) {
        return false;
      }
    }

    if (filters.dateBefore) {
      const filterDate = new Date(filters.dateBefore);
      const propertyDate = convertPropertyDate(property.added);
      if (propertyDate > filterDate) {
        return false;
      }
    }

    if (filters.postcodeArea && filters.postcodeArea.trim() !== '') {
      const propertyPostcode = extractPostcodeArea(property.location);
      const filterPostcode = filters.postcodeArea.trim().toUpperCase();
      if (propertyPostcode !== filterPostcode) {
        return false;
      }
    }

    return true;
  });
};

