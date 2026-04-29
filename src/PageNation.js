import Button from "react-bootstrap/Button";
function PageNation({ records, changeTarget }) {
  const handleClick = (page) => {
    if (records[page] != null) {
      changeTarget(records[page]);
    }
  };
  return (
    <div className="pagination_box">
      <Button
        variant="light"
        size="sm"
        id="pvB"
        style={{
          backgroundColor: "white",
        }}
        onClick={() => handleClick("previous")}
      >
        <i class="bi bi-arrow-left-square-fill fs-5"></i>
      </Button>
      <i>
        {records["current"]}/{records["final"]}
      </i>
      <Button
        variant="light"
        size="sm"
        id="nxB"
        style={{
          backgroundColor: "white",
        }}
        onClick={() => handleClick("next")}
      >
        <i class="bi bi-arrow-right-square-fill fs-5"></i>
      </Button>
    </div>
  );
}
export default PageNation;
