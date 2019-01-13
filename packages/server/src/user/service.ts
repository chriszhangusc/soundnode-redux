import * as userRepo from './repository';

export function getUserById(userId: number) {
  return userRepo.getUserId(userId);
}
