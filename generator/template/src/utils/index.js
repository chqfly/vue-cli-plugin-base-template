/**
 * 用于处理异步任务的时候避免使用try catch进行包裹
 * 返回值顺序遵循错误优先的原则
 */
export function awaitTo(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => {
      return [err];
    });
}
