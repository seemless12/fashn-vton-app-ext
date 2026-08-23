import { cn } from '../../lib/utils';

export default function Skeleton({ className, rounded = true }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-100',
        rounded && 'rounded-lg',
        className
      )}
    />
  );
}
