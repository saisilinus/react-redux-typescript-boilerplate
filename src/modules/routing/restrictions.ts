interface IRestriction {
  none: string[];
  user: string[];
  admin: string[];
}

const restrictions: IRestriction = {
  none: ['admin', 'user'],
  user: ['admin', 'user'],
  admin: ['admin'],
};

export default restrictions;
