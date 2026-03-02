import "./tag.scss";

interface TagProps {
  title: string;
}

export const Tag = ({ title }: TagProps) => {
  return <span className="tag">{title}</span>;
};
