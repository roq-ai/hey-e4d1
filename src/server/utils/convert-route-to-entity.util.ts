const mapping: Record<string, string> = {
  contents: 'content',
  followers: 'follower',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
