export const capitalizeFirstLetter = (string) => {
  return string?.charAt?.(0)?.toUpperCase() + string?.slice(1);
};

export const CheckColorPokemonType = (type) => {
  switch (type) {
    case "grass":
      return "#D3ECC9";

    case "water":
      return "#CDDAF7";

    case "normal":
      return "#E1E2D3";

    case "bug":
      return "#E1E6BF";

    case "fire":
      return "#F7D6C0";

    case "electric":
      return "#F9EDC3";

    case "fairy":
      return "#F6DDE3";

    case "poison":
      return "#8e7cc3";

    default:
      return "#E1E6BF";
  }
};
