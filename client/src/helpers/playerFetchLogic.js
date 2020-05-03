export function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export const makeCancelableFunction = fn => {
  let hasCanceled = false;

  return {
    promise: val =>
      new Promise((resolve, reject) => {
        if (hasCanceled) {
          fn = null;
        } else {
          fn(val);
          resolve(val);
        }
      }),
    cancel() {
      hasCanceled = true;
    }
  };
};

export const makePlayerDataFetch = (searchId, platform) => {
  return fetch(`/search/add?id=${searchId}${"&platform=" + platform}`);
};

export const makeCancelablePlayerDataFetch = (searchId, platform, waitTime) => {
  const cancelablePromise = makeCancelableFunction(
    timeoutPromise(
      waitTime * 1000,
      fetch(`/search/add?id=${searchId}${"&platform=" + platform}`)
    )
  );

  return cancelablePromise;
};
