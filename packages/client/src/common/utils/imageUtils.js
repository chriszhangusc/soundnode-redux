import { SIZES } from '@soundnode-redux/client/src/common/constants/imageConsts';

function imageSizeFactory(size) {
  return (imageUrl) => {
    if (!imageUrl) return null;
    const matches = Object.values(SIZES).filter(s => imageUrl.indexOf(s) > -1);
    if (matches.length > 1) throw Error('The image url should not match more than one size!');
    if (matches.length === 0) throw Error('The url does not match any size');
    return imageUrl.replace(matches[0], size);
  };
}

export const getMiniVersion = imageSizeFactory(SIZES.mini);
export const getTinyVersion = imageSizeFactory(SIZES.tiny);
export const getSmallVersion = imageSizeFactory(SIZES.small);
export const getNormalVersion = imageSizeFactory(SIZES.large);
export const getMediumVersion = imageSizeFactory(SIZES.t300x300);
export const getLargeVersion = imageSizeFactory(SIZES.t500x500);
