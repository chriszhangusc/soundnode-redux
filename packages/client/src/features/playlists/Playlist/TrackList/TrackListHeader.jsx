import React from 'react';
import Table from './Table';

function TrackListHeader() {
  return (
    <Table.Header>
      <Table.HeaderIdCell>#</Table.HeaderIdCell>
      <Table.HeaderCell width="40%">Title</Table.HeaderCell>
      <Table.HeaderCell width="30%">Artist</Table.HeaderCell>
      <Table.HeaderCell width="15%">Time</Table.HeaderCell>
      <Table.HeaderCell width="10%">Played</Table.HeaderCell>
    </Table.Header>
  );
}

export default TrackListHeader;
