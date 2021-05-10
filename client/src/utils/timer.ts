let clearStatusTimeout: null | ReturnType<typeof setTimeout> = null;

const resetStatusTimeout = (
  clearStatusTimeout: null | ReturnType<typeof setTimeout>
) => {
  if (!clearStatusTimeout) return;
  return clearTimeout(clearStatusTimeout);
};

export const updateStatusAfterExpiryTime = (expTime: null | number) => {
  resetStatusTimeout(clearStatusTimeout);
  if (!expTime) {
    console.log('Updated the status: ');
    return;
  }

  clearStatusTimeout = setTimeout(() => {
    console.log('Updated the status: ');
    resetStatusTimeout(clearStatusTimeout);
  }, expTime);
};
