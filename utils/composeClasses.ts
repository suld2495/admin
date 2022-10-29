import { ClassType } from "components/common/type";

export const composeClasses = (...classes: ClassType[]) => {
  const classSet = classes.reduce((acc, className) => {
    if (!className) return acc;

    if (typeof className === 'string') {
      acc.add(className);
    } else {
      className.forEach(acc.add, acc);
    }

    return acc;
  }, new Set<string>());

  return [...classSet].join(' ');
};
