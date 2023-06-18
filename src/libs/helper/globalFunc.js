export const capitalizeFirstLetter = (string) => {
  return string?.charAt?.(0)?.toUpperCase() + string?.slice(1);
};

export const CheckColorPokemonType = (type, isDark) => {
  switch (type) {
    case "grass":
      return isDark ? "hsl(90, 20%, 53%)" : "hsl(90, 56%, 86%)";

    case "water":
      return isDark ? "hsl(208, 38%, 61%)" : "hsl(208, 62%, 89%)";

    case "normal":
      return isDark ? "hsl(60, 5%, 66%)" : "hsl(60, 8%, 89%)";

    case "bug":
      return isDark ? "hsl(64, 8%, 66%)" : "hsl(64, 32%, 89%)";

    case "fire":
      return isDark ? "hsl(20, 70%, 61%)" : "hsl(20, 80%, 89%)";

    case "electric":
      return isDark ? "hsl(52, 64%, 61%)" : "hsl(52, 92%, 89%)";

    case "fairy":
      return isDark ? "hsl(340, 44%, 66%)" : "hsl(340, 72%, 89%)";

    case "poison":
      return isDark ? "hsl(253, 9%, 50%)" : "hsl(253, 35%, 78%)";

    case "flying":
      return isDark ? "hsl(23, 100%, 54%)" : "hsl(23, 100%, 84%)";

    case "fighter":
      return isDark ? "hsl(0, 80%, 42%)" : "hsl(0, 100%, 72%)";

    default:
      return isDark ? "hsl(64, 10%, 66%)" : "hsl(64, 32%, 89%)";
  }
};
