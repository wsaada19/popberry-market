export const contentfulLoader = ({ src, width }) => {
  return src + `?w=${width}&fm=webp`;
};

export const pixelsLoader = ({ src }) => {
  return `https://${src}`;
};
