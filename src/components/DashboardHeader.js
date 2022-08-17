import earth from '../images/earth.svg';
import NavigationBar from './NavigationBar';

function DashboardHeader() {
  return (
    <header className="dashboardHeader">
      <NavigationBar />
      <div className="headerContainer wrapper">
        <div className="headerTextContainer">
          <h1>Travel Sheets</h1>
          <h2>
            What are your favourite cities and the <span className="boldText">Top 5</span> best things to do there? Add
            it below and help others plan for their next trip ↓{' '}
          </h2>
        </div>
        <div
          className="imgContainer headerImg"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-easing="ease"
          data-aos-delay="0"
        >
          <img src={earth} alt="The earth" />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
