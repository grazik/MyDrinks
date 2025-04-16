import "./heroBanner.scss";
interface Props {}

export const HeroBanner = ({}: Props) => {
  return (
    <div className="hero-banner">
      <div className="hero-banner__content wrapper">
        <div className="hero-banner__section">
          <h1 className="main-heading">My Drinks</h1>
          <p className="body-text">
            Discover an artful blend of premium spirits and fresh ingredients.
            Explore recipes tailored to your taste and create cocktails that
            elevate your moments.
          </p>
        </div>
        <div className="hero-banner__section">
          <img
            className="hero-banner__image"
            src="/hero-image.png"
            alt="Vodka and Cocktail Glasses"
          />
        </div>
      </div>
    </div>
  );
};
