import { Tag } from "@/src/components/atoms/tag/Tag";
import tokens from "@/src/styles/tokens.module.scss";

type QuantityBadgeProps = {
  quantity: number;
};

export const QuantityBadge = ({ quantity }: QuantityBadgeProps) => (
  <Tag
    title={`× ${quantity}`}
    bgColor={tokens.colorBackground}
    color={tokens.colorTextLight}
    fontSize={"1.25rem"}
  />
);
