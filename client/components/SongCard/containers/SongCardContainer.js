
import { connect } from 'react-redux';
import { getTrackById } from 'client/redux/modules/entities/entitiesSelectors';
import { isTrackActive } from 'client/redux/modules/player/selectors';
import SongCard from '../components/SongCard';

// Layout component just to assemble children presentational components.

// By doing this, there will be more useless rendering going in the subcomponent.
// For example if we like this song, its image info and controls components will
// all be re-rendered.
// Instead of having a top level container passing down props to its children,
// we need to connect each of the children component to a container.
// When the connected container is told to be re-rendered, it will check if the mapped
// object is shallowly equal or not.

const mapStateToProps = (state, { trackId }) => ({
  track: getTrackById(state, trackId),
  active: isTrackActive(state, trackId),
});

export default connect(mapStateToProps)(SongCard);
