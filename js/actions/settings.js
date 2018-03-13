import round from 'lodash/round';
import * as Constants from '../constants';

export const UPDATE_SETTING = 'UPDATE_SETTING';

export function setMinimumBarRating(rating) {
  return {
    type: UPDATE_SETTING,
    key: 'minimumBarRating',
    value: rating < Constants.MIN_BAR_RATING
      ? Constants.MIN_BAR_RATING
      : round(rating, 1),
  };
}

export function setMaximumBarRating(rating) {
  return {
    type: UPDATE_SETTING,
    key: 'maximumBarRating',
    value: rating > Constants.MAX_BAR_RATING
      ? Constants.MAX_BAR_RATING
      : round(rating, 1),
  };
}

export function setMinimumBarPrice(price) {
  return {
    type: UPDATE_SETTING,
    key: 'minimumBarPrice',
    value: price < Constants.MIN_BAR_PRICE ? Constants.MIN_BAR_PRICE : price,
  };
}

export function setMaximumBarPrice(price) {
  return {
    type: UPDATE_SETTING,
    key: 'maximumBarPrice',
    value: price > Constants.MAX_BAR_PRICE ? Constants.MAX_BAR_PRICE : price,
  };
}

export function setDistanceToSkip(distance) {
  return {
    type: UPDATE_SETTING,
    key: 'distanceToSkip',
    value: distance,
  };
}

export function setFilteredBarTypes(filteredBars) {
  return {
    type: UPDATE_SETTING,
    key: 'filterBarTypes',
    value: filteredBars,
  };
}
