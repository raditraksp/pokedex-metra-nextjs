import { notification } from "antd";

export const CapitalizeFirstLetter = (string) => {
  return string && string?.charAt?.(0)?.toUpperCase() + string?.slice(1);
};

export const CapitalizeAfterSpace = (string) => {
  return (
    string &&
    string?.replace(/(^|\s)\S/g, function (match) {
      return match?.toUpperCase();
    })
  );
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

    case "fighting":
      return isDark ? "hsl(0, 80%, 42%)" : "hsl(0, 100%, 72%)";

    case "ground":
      return isDark ? "hsl(34, 35%, 40%)" : "hsl(34, 52%, 75%)";

    case "rock":
      return isDark ? "hsl(40, 26%, 35%)" : "hsl(40, 44%, 70%)";

    case "ghost":
      return isDark ? "hsl(270, 14%, 20%)" : "hsl(270, 28%, 45%)";

    case "steel":
      return isDark ? "hsl(210, 10%, 35%)" : "hsl(210, 22%, 65%)";

    case "psychic":
      return isDark ? "hsl(320, 28%, 30%)" : "hsl(320, 50%, 60%)";

    case "ice":
      return isDark ? "hsl(195, 33%, 38%)" : "hsl(195, 48%, 70%)";

    case "dragon":
      return isDark ? "hsl(240, 80%, 30%)" : "hsl(240, 80%, 60%)";

    case "dark":
      return isDark ? "hsl(0, 0%, 15%)" : "hsl(0, 0%, 40%)";

    case "unknown":
      return isDark ? "hsl(0, 0%, 40%)" : "hsl(0, 0%, 70%)";

    case "shadow":
      return isDark ? "hsl(64, 8%, 8%)" : "hsl(0, 0%, 70%)";

    default:
      return isDark ? "hsl(64, 10%, 66%)" : "hsl(64, 32%, 89%)";
  }
};

export function ShowNotificationCustom(status, msg, desc) {
  notification[status]({
    // message: msg,
    description: desc,
  });
}
