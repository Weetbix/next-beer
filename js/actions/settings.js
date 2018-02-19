export const UPDATE_SETTING = 'UPDATE_SETTING';

export function setMinimumBarDistance(metres) {
  return {
    type: UPDATE_SETTING,
    key: 'minimumBarDistance',
    value: metres,
  };
}

export function setMaximumBarDistance(metres) {
  return {
    type: UPDATE_SETTING,
    key: 'maximumBarDistance',
    value: metres,
  };
}
