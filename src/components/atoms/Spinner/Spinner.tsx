import "./spinner.scss";

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className = "" }: SpinnerProps) => {
  return <span className={`spinner ${className}`.trim()} aria-hidden="true" />;
};
