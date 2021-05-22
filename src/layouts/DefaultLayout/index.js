import { useHistory, NavLink } from 'react-router-dom';
import './index.scss';

const DefaultLayout = (props) => {
  const history = useHistory();

  return (
    <div className="DefaultLayout">
      {props.children}
      <nav className="menu">
            <ul>
                <li>
                    <NavLink exact to="/main" activeClassName="selected">
                        {/* <img className="active" src="/images/tab_quiz_active.svg" />
                        <img className="non-active" src="/images/tab_quiz.svg" /> */}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/review" activeClassName="selected">
                        {/* <img className="active" src="/images/tab_review_active.svg" />
                        <img className="non-active" src="/images/tab_review.svg" /> */}
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/config" activeClassName="selected">
                        {/* <img className="active" src="/images/tab_more_active.svg" />
                        <img className="non-active" src="/images/tab_more.svg" /> */}
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default DefaultLayout;