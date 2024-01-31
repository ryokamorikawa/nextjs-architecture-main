/**
 * setTimeout を Promise で包んだ処理
 * @param msec<number>ミリ秒
 */
export const sleep = async (msec: number) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};
