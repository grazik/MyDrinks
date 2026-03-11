import { StatusScreen } from "@/src/components/atoms/StatusScreen/StatusScreen";

export const NoActiveEventStatusScreen = () => (
  <StatusScreen
    icon="/icons/shaker-moon.png"
    title="No active event."
    description="The bar is currently closed. Guests can browse recipes, but ordering is disabled."
  />
);

export const NoOrderSelectedStatusScreen = () => (
  <StatusScreen
    icon="/icons/book-search.png"
    title="No order selected."
    description="Tap an order card to view its recipe details and instructions."
  />
);

export const PendingStatusScreen = () => (
  <StatusScreen
    icon="/icons/bell.png"
    title="Waiting for orders..."
    description="All incoming orders have been accepted or moved to mixing."
  />
);

export const MixingStatusScreen = () => (
  <StatusScreen
    icon="/icons/mixing-glass.png"
    title="No drinks in progress."
    description="Pick an order from PENDING to start mixing."
  />
);

export const ReadyStatusScreen = () => (
  <StatusScreen
    icon="/icons/checkbox.png"
    title="The bar top is clear."
    description="All ready drinks have been picked up by guests."
  />
);

export const HistoryStatusScreen = () => (
  <StatusScreen
    icon="/icons/history.png"
    title="No history yet."
    description="Completed and cancelled orders will appear here."
  />
);

export const AllCaughtUpStatusScreen = () => (
  <StatusScreen
    icon="/icons/coupe-sparkle.png"
    title="All caught up!"
    description="You have zero active orders. Great job keeping the bar clear."
  />
);
