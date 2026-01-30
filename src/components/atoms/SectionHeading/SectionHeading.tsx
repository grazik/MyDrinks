type SectionHeadingProps = {
  Heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className: string;
  children: React.ReactNode;
};

const SectionHeading = ({
  Heading,
  className,
  children,
}: SectionHeadingProps) => <Heading className={className}>{children}</Heading>;

const sectionHeadingFactory = (props: Omit<SectionHeadingProps, "children">) =>
  function SectionHeadingWrapper(
    nestedProps: Pick<SectionHeadingProps, "children">,
  ) {
    return <SectionHeading {...props}>{nestedProps.children}</SectionHeading>;
  };

export type SectionHeadingType = ReturnType<typeof sectionHeadingFactory>;

export const H2SectionHeading = sectionHeadingFactory({
  Heading: "h2",
  className: "section-heading",
});

export const H3SectionHeading = sectionHeadingFactory({
  Heading: "h3",
  className: "subsection-heading",
});
