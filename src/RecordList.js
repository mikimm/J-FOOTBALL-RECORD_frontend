import PageNation from "./PageNation";
import SearchBox from "./SearchBox";

function RecordList({ records, changeTarget }) {
  return (
    <main>
      <div className="content-list">
        <SearchBox changeTarget={changeTarget} />
        {records.results ? (
          records.results.map((record, index) => (
            <li key={index} className="record">
              <div className="home_team">
                <img className="team-logo" src={record.home_team_logo} />
                <div className="home-team-name">
                  {record.home_team_name}(Home)
                </div>
              </div>
              <div className="game">
                <div className="round">第{record.round}節</div>
                <div className="score">
                  {record.home_score}-{record.away_score}
                </div>
              </div>
              <div className="away_team">
                <img className="team-logo" src={record.away_team_logo} />
                <div className="away-team-name">
                  {record.away_team_name}(Away)
                </div>
              </div>
              <div className="title">title:{record.title}</div>
              <div className="match-day">
                <p className="record-match-day">match_day</p>
                <p className="record-match-day">{record.match_day}</p>
              </div>
              <div className="created-by">
                created_by:{record.created_by_id}
              </div>
            </li>
          ))
        ) : (
          <h1>該当データがありません。</h1>
        )}
        <PageNation records={records} changeTarget={changeTarget} />
      </div>
    </main>
  );
}
export default RecordList;
