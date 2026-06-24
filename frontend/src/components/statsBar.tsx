import * as Styled from "../styles/styledComponents";

type Props = {
  totalItems: number;
  boughtItems: number;
  remainingItems: number;
};

export default function StatsBar({
  totalItems,
  boughtItems,
  remainingItems,
}: Props) {
  return (
    <Styled.StatsBar>
      <span>Total: {totalItems}</span>
      <span>Bought: {boughtItems}</span>
      <span>Remaining: {remainingItems}</span>
    </Styled.StatsBar>
  );
}