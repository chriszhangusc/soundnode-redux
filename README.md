# React Redux version of one of my favorite music app http://www.soundnodeapp.com/.

To run it in development mode locally:
1. git clone
2. Type in command yarn install to install all dependencies.
3. npm run dev-api to start api server.
4. npm run dev-server to start webpack-dev-server.
5. http://localhost:3000/

# Structure and Naming

Use redux-actions
action name: <NOUN>_<VERB>
action creator name: <Verb><Noun>
selector name: get<Noun>


From Airbnb style guide: 
And if you don't have state or refs, prefer normal functions (not arrow functions) over classes:

// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}