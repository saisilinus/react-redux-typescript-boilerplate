const formatNames = (names: string[]): string => names.map((i) => i.charAt(0).toUpperCase() + i.substring(1)).join(' ');

export default formatNames;
