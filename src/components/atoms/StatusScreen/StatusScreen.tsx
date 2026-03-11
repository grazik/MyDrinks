import Image from "next/image";
import "./status-screen.scss";

interface StatusScreenProps {
  icon: string;
  title: string;
  description: string;
}

export const StatusScreen = ({ icon, title, description }: StatusScreenProps) => {
  return (
    <div className="status-screen">
      <Image
        src={icon}
        alt=""
        width={64}
        height={64}
        className="status-screen__icon"
      />
      <p className="status-screen__title">{title}</p>
      <p className="status-screen__description">{description}</p>
    </div>
  );
};
