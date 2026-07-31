const paths: Record<string, React.ReactNode> = {
  Email: (
    <>
      <rect x="2.5" y="4" width="15" height="12" rx="2.5" />
      <path d="M3.5 6.5 10 11l6.5-4.5" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
      <path d="M6 8.5V14M6 5.75v.01M9.75 14V8.5M9.75 11c0-1.5.9-2.5 2.25-2.5S14 9.5 14 11v3" />
    </>
  ),
  Phone: (
    <path d="M6.2 3.2 8 6l-1.6 1.6a10 10 0 0 0 4 4L12 10l2.8 1.8a1.4 1.4 0 0 1 .4 1.9l-.9 1.3a1.8 1.8 0 0 1-2 .7C8.4 14.6 5.4 11.6 4.1 6.7a1.8 1.8 0 0 1 .7-2l1.3-.9a1.4 1.4 0 0 1 1.9.4Z" />
  ),
};

export default function ContactIcon({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[label]}
    </svg>
  );
}
