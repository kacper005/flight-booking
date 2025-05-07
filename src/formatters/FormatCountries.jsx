import { overwrite } from "country-list";

export const overwriteCountries = () => {
  overwrite([
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "TR", name: "Turkey" },
  ]);
};
