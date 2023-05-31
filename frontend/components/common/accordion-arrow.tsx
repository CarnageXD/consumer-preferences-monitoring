export const AccordionArrow = ({ open }: { open: boolean }) => {
  console.log("open", open);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${open && "rotate-180"} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
