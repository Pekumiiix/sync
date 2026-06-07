import type { MotionProps } from 'motion-v';

type MotionVariants = MotionProps<'div'>['variants'];

export const staggerContainer: MotionProps<'div'>['variants'] = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  }
};

export const fadeSlideYConfig: Pick<MotionProps, 'initial' | 'animate' | 'exit'> = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export const fadeSlideYVariant = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
} satisfies MotionVariants;
