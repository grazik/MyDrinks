export const stripJsonTokens = (json: string) => {
  return json.replace("json", "").replaceAll("```", "");
};
