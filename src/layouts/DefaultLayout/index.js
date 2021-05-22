import { useHistory, NavLink } from 'react-router-dom';
import './index.scss';
import mapIcon from '../../assets/images/location_on_black.svg';
import homeIcon from '../../assets/images/home_black.svg';
import settingIcon from '../../assets/images/settings_black.svg';

const DefaultLayout = (props) => {
  const history = useHistory();

  return (
    <div className="DefaultLayout">
      {props.children}
      <nav className="menu">
            <ul>
                <li>
                    <NavLink exact to="/map" activeClassName="selected">
                      <img src={mapIcon} />
                    </NavLink>
                </li>
                <li>
                <NavLink exact to="/map" activeClassName="selected">
                      <img src={homeIcon} />
                    </NavLink>
                </li>
                <li>
                <NavLink exact to="/map" activeClassName="selected">
                      <img src={settingIcon} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default DefaultLayout;