import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import {
  useCheckBloodSugarMutation,
  useGetBloodSugarsQuery,
} from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";

const initState = {
  bloodSugarLevel: "",
};

export default function BloodSugar() {
  const { setNotification, setTable, isEditing, setIsEditing } =
    useOutletContext();
  const {
    user: { userId },
  } = useAuth();
  const {
    data: bloodSugarsHistory,
    isFetching,
    isSuccess,
    isError,
  } = useGetBloodSugarsQuery(userId);
  const [checkBloodSugar, { data, isLoading }] = useCheckBloodSugarMutation();
  const [bloodSugarInputs, setBloodSugarInputs] = useState(initState);

  useEffect(() => {
    if (isSuccess) {
      setTable({
        columns: [
          "Date",
          "Time",
          "BloodSugar Level",
          "Category",
          "Description",
        ],
        data: bloodSugarsHistory
          .map((data) => ({
            Date: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("YYYY/MM/DD")
              : "-",
            Time: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("hh:mmA")
              : "-",
            "BloodSugar Level": data.bloodSugarLevel,
            Category: data.category,
            Description: data.description,
            readingId: data.readingId,
            recordedDateTime: data.recordedDateTime,
          }))
          .reverse(),
      });
    } else if (isError) {
      setTable(null);
    }
  }, [isFetching, isError, isSuccess, bloodSugarsHistory, setTable]);

  useEffect(() => {
    if (isEditing) {
      console.log(isEditing);
      setBloodSugarInputs({
        bloodSugarLevel: isEditing["BloodSugar Level"],
        readingId: isEditing.readingId,
        recordedDateTime: isEditing.recordedDateTime,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setBloodSugarInputs((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkBloodSugar({
      userId,
      recordedDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ...bloodSugarInputs,
    }).then(({ data }) => {
      if (data) {
        setNotification({
          type: "info",
          message: `Your Blood Sugar is ` + data.category,
          timestamp: new Date(),
        });
        if (isEditing) {
          setIsEditing(false);
        }
        setBloodSugarInputs(initState);
      } else {
        setNotification({
          type: "error",
          message: "Something went wrong",
          timestamp: new Date(),
        });
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBloodSugarInputs(initState);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
        <Input
          label="Blood Sugar Level"
          name="bloodSugarLevel"
          type="number"
          value={bloodSugarInputs.bloodSugarLevel}
          onChange={handleChange}
          required
          small
        />
        <div className="flex gap-5 my-6 items-center">
          {isEditing && (
            <span
              className="underline text-primary cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </span>
          )}
          <Button type="submit" disabled={isLoading}>
            {isEditing ? "Save" : "Insert"}
          </Button>
        </div>
      </form>
      {!isEditing && <div className="my-8">{data?.description}</div>}
    </>
  );
}
