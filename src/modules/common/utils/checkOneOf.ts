const checkOneOf = (values: any[]) => values.every((value) => value === '' || value === 0);

export default checkOneOf;
