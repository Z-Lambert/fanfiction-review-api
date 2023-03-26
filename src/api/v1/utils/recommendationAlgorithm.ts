import { getUser } from '../database';
import { sampleData } from '../../../data/sampleData';
import { log } from './logger.utils';

/**
 * This algorithm checks the archive of fanfictions and returns only those
 * that are in the fandom AND genre preference stored on the user object
 */
export const getRecommendations = async (userId: string) => {
  const userData = await getUser(userId);
  // Need to replace sample data with a getData() when it is in the database TODO
  return sampleData.filter(fanfic => {
    return (
      userData?.favouriteFandoms?.includes(fanfic.fandom) &&
      userData?.interests?.some(interest => fanfic.genres.includes(interest))
    );
  });
};
