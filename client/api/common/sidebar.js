export function fetchSidebarData() {
  return [
    {
      to: '/charts',
      iconClassName: 'fa fa-trophy',
      title: 'Top 50',
    },
    {
      to: '/likes',
      iconClassName: 'fa fa-heart',
      title: 'Likes',
    },
    {
      to: '/playlists',
      iconClassName: 'fa fa-list',
      title: 'Playlists',
    },
    {
      to: '/tracks',
      iconClassName: 'fa fa-music',
      title: 'Stream',
    },
  ];
}
