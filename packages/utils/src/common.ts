import * as R from "ramda";

export const noop = (): void => {};
export const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);

export const truncateName = (name: string, maxLength: number) =>
  name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
