export const sortOrder = (data, sortParams) => {
  if (!sortParams[data]) {
    return 'desc';
  } else if (sortParams[data] && sortParams[data] === 'desc') {
    return 'asc';
  }

  return '';
}

export const stringifySortOrder = (sortParams) => {
  const sortArr = Object.entries(sortParams).map((sP) => {
    return (sP[0] + '.' + sP[1]);
  });
  return sortArr;
}
