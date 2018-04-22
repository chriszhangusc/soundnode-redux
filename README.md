# SoundNode Redux

This is a web-based single page application built with react redux styled-components and more, it is powered by the amazing [soundcloud api](https://developers.soundcloud.com/docs/api/guide). Inspired by one of my favorite music client on macOS: [SoundNode](http://www.soundnodeapp.com/).

## Overview
[![soundnode-redux.png](https://s1.postimg.cc/3vug7t265b/preview.png)](https://redux-music.herokuapp.com)

### Player
[![preview1.png](https://s19.postimg.cc/qmte7kodf/preview1.png)](https://postimg.cc/image/v8pifx9wf/)

### Playlists
[![playlists_preview.png](https://s19.postimg.cc/9nkfslnj7/playlists_preview.png)](https://postimg.cc/image/fbqqjhrvj/)

### Search Suggestions
[![search_suggestions.png](https://s19.postimg.cc/6ur88e7pf/search_suggestions.png)](https://postimg.cc/image/qclvoc4n3/)

## Getting Started

Here is a production demo running on [heroku](https://redux-music.herokuapp.com). It is better to have an active soundcloud account to unlock more features of this app!

To run it in dev mode locally:
1. git clone https://github.com/MiniPekka/redux-music.git
2. cd redux-music and run command "yarn install"
3. Start the proxy server by running command "yarn run proxy"
4. Start the app by running command "yarn run dev"
5. In the browser(Only tested in Chrome) go to: http://localhost:3000/

## Features
- Top 50 for a wide range of genres
- Authenticate through soundcloud
- Search suggestions powered by redux-saga
- Player with play, stop, seeking, next track, previous track, repeat, shuffle, cycle, mute, volume change, built purely with react, redux and html5
- Play queue that has handy dropdown action list to make changes to specific songs
- Add/Remove songs to/from existing playlist
- Playlist overview for the current user
- Like/Unlike song
- Add/Remove to/from reposts
- Scroll to fetch more
- Single track profile with comments
- Single user profile with user's track list

## Built With

- [react](https://reactjs.org/)
- [redux](http://redux.js.org/)
- [redux-saga](https://redux-saga.js.org/)
- [styled-components](https://www.styled-components.com/)
- [webpack3](https://webpack.js.org/)
- [react-router](https://reacttraining.com/react-router/)
- [normalizr](https://github.com/paularmstrong/normalizr)
- [recompose](https://github.com/acdlite/recompose)
- [soundcloud-api](https://developers.soundcloud.com/docs/api/guide)

## Reach Out To Me

I started this project to help me learn react in practice, and I have always been trying to apply all the cool things I've learnt. I know it is still far from perfect but I am always trying to make it better. Any suggestions or advice would be valuable to me. So if you are willing to discuess or contribute to this project please feel free to reach out to me, it would mean a lot to me!!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [SoundNode](http://www.soundnodeapp.com/)
* [Favesound-redux](https://github.com/rwieruch/favesound-redux)
* [sound-redux](https://github.com/andrewngu/sound-redux)
* [react-redux-links](https://github.com/markerikson/react-redux-links)
* [project-minimek](https://github.com/markerikson/project-minimek)