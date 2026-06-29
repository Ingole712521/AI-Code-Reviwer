type BrandNameProps = {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export function BrandName({ size = 'md', showTagline = false }: BrandNameProps) {
  return (
    <div className="flex flex-col leading-none">
      <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
        Rev<span className="text-gradient-animated">io</span>
      </span>
      {showTagline && (
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
          AI PR Reviews
        </span>
      )}
    </div>
  );
}
