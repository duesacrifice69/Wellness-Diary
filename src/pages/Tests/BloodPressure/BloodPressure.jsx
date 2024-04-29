import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import {
  useCheckBloodPressureMutation,
  useGetBloodPressuresQuery,
} from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";

const initState = {
  systolic: "",
  diastolic: "",
};

export default function BloodPressure() {
  const { setNotification, setTable, isEditing, setIsEditing, onlyHistory } =
    useOutletContext();
  const {
    user: { userId },
  } = useAuth();
  const {
    data: bloodPressuresHistory,
    isFetching,
    isSuccess,
    isError,
  } = useGetBloodPressuresQuery(userId);
  const [checkBloodPressure, { data, isLoading }] =
    useCheckBloodPressureMutation();
  const [bloodPressureInputs, setBloodPressureInputs] = useState(initState);

  useEffect(() => {
    if (isSuccess) {
      setTable({
        columns: [
          "Date",
          "Time",
          "Systolic",
          "Diastolic",
          "Category",
          "Description",
        ],
        data: bloodPressuresHistory
          .map((data) => ({
            Date: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("YYYY/MM/DD")
              : "-",
            Time: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("hh:mmA")
              : "-",
            Systolic: data.systolic,
            Diastolic: data.diastolic,
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
  }, [isFetching, isError, isSuccess, bloodPressuresHistory, setTable]);

  useEffect(() => {
    if (isEditing) {
      setBloodPressureInputs({
        diastolic: isEditing.Diastolic,
        systolic: isEditing.Systolic,
        readingId: isEditing.readingId,
        recordedDateTime: isEditing.recordedDateTime,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setBloodPressureInputs((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkBloodPressure({
      userId,
      recordedDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ...bloodPressureInputs,
    }).then(({ data }) => {
      if (data) {
        setNotification({
          type: "info",
          message: `Your Blood Pressure is ` + data.category,
          timestamp: new Date(),
        });
        if (isEditing) {
          setIsEditing(false);
        }
        setBloodPressureInputs(initState);
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
    setBloodPressureInputs(initState);
  };

  return (
    <>
      {!onlyHistory && (
        <form onSubmit={handleSubmit} className="my-8">
          <Input
            label="Systolic (mm Hg)"
            name="systolic"
            type="number"
            value={bloodPressureInputs.systolic}
            onChange={handleChange}
            required
            small
          />
          <Input
            label="Diastolic (mm Hg)"
            name="diastolic"
            type="number"
            value={bloodPressureInputs.diastolic}
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
      )}
      {!isEditing && <div className="my-8">{data?.description}</div>}
    </>
  );
}
