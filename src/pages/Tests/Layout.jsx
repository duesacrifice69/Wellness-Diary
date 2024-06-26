import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Button, Heading } from "../../components/Common";
import { useEffect, useState } from "react";
import { Table } from "../../components/Common";
import dayjs from "dayjs";

export default function Layout() {
  const { setNotification } = useOutletContext();
  const [showHistory, setShowHistory] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [table, setTable] = useState();
  const location = useLocation();
  const lastPath = location?.pathname
    .split("/")
    .slice(-1)[0]
    .split(/(?=[A-Z][a-z])/)
    .join(" ");
  const oneBeforeLastPath = location?.pathname
    .split("/")
    .slice(-2, -1)[0]
    .split(/(?=[A-Z][a-z])/)
    .join(" ");

  const onlyHistory = lastPath === "History";

  const handleViewHistoryClick = () => {
    if (showHistory) {
      window.scrollTo(0, 0);
      setShowHistory(false);
    } else {
      setShowHistory(true);
      setTimeout(() => {
        const el = document.getElementById("history");
        el.scrollIntoView({ block: "center" });
      }, 50);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-10">
      <div className="max-w-screen-md m-auto">
        <Heading>{onlyHistory ? oneBeforeLastPath : lastPath} Tracker</Heading>
        <div>{`${isEditing ? "Edit" : "Monitor"} Your ${
          onlyHistory ? oneBeforeLastPath : lastPath
        } ${
          isEditing
            ? `Inputs on ${dayjs(isEditing.Date).format(
                "dddd DD, MMMM YYYY"
              )} at ${isEditing.Time}`
            : "Trends and Stay Healthy"
        }`}</div>
        <Outlet
          context={{
            setNotification,
            setTable,
            isEditing,
            setIsEditing,
            onlyHistory,
          }}
        />
        {!isEditing && !onlyHistory && (
          <div id="history">
            <Button className="ml-auto" onClick={handleViewHistoryClick}>
              {showHistory ? "Hide" : "Show"} History
            </Button>
          </div>
        )}
      </div>
      {!isEditing && (
        <div className={showHistory || onlyHistory ? "block my-10" : "hidden"}>
          {table?.data ? (
            <Table
              columns={table?.columns}
              data={table?.data}
              onEdit={setIsEditing}
            />
          ) : (
            <Heading className="mx-auto py-10 w-max">
              No Records Found ...
            </Heading>
          )}
        </div>
      )}
    </div>
  );
}
