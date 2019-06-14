/* eslint-disable indent */
import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
import fetchApi from '../../utils/fetchApi';

const Profile = () => {
  const [{ user }] = useStateValue();

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
};

export default Profile;
