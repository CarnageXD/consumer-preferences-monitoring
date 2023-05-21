interface LayoutProps {
  children: React.ReactNode;
  withTopPadding?: boolean;
  className?: string;
}

export const Layout = ({
  children,
  withTopPadding = true,
  className,
}: LayoutProps) => {
  return (
    <div
      className={`px-4 flex flex-col gap-8 xl:px-20 pt-8 ${
        withTopPadding ? "sm:pt-12" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
