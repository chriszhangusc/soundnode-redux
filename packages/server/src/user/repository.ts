import * as userApiV2 from '@soundnode-redux/server/src/common/soundcloud/v2/user';

export async function getUserId(userId: number) {
  return userApiV2.getUserById(userId);
}
