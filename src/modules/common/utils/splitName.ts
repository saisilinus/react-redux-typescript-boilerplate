const splitName = (name: string | undefined): string[] => (name ? name.split(' ') : ['', '']);

export default splitName;
