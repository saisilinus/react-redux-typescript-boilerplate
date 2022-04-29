const restrictions: Record<string, string[]> = {
  none: ['admin', 'user'],
  user: ['admin', 'user'],
  admin: ['admin'],
};

export default restrictions;
