export const documentsInfo = meta => {
  const { limit, page, totalDocs } = meta || {};
  let upperLimit = limit * page;
  if (upperLimit > totalDocs) upperLimit = totalDocs;
  let lowerLimit = limit * page - limit + 1;

  return `${lowerLimit} to ${upperLimit} of ${totalDocs}`;
}

export const pageInfo = meta => {
  const { page, totalPages } = meta || {};

  return `Page ${page} of ${totalPages}`;
}
