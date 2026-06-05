import type { MotionProps } from 'motion-v';

export const staggerContainer: MotionProps<'div'>['variants'] = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 1
    }
  },
  exit: {
    transition: {
      staggerChildren: 1,
      staggerDirection: -1
    }
  }
};

export const fadeSlideYConfig: Pick<MotionProps, 'initial' | 'animate' | 'exit'> = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};
