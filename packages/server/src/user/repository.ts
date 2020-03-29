import * as userApiV2 from '../common/soundcloud/v2/user';

export async function getUserId(userId: number) {
  return userApiV2.getUserById(userId);
}
