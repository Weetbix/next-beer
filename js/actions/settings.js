import * as Constants from '../constants';

export const UPDATE_SETTING = 'UPDATE_SETTING';

export function setMinimumBarDistance(metres) {
  return {
    type: UPDATE_SETTING,
    key: 'minimumBarDistance',
    value: metres < Constants.MIN_BAR_DISTANCE
      ? Constants.MIN_BAR_DISTANCE
      : metres,
  };
}

export function setMaximumBarDistance(metres) {
  return {
    type: UPDATE_SETTING,
    key: 'maximumBarDistance',
    value: metres > Constants.MAX_BAR_DISTANCE
      ? Constants.MAX_BAR_DISTANCE
      : metres,
  };
}
