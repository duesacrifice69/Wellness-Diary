import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import {
  useCheckCholesterolsMutation,
  useGetCholesterolQuery,
} from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";

const initState = {
  ldl: "",
  hdl: "",
};

export default function Cholesterol() {
  const { setNotification, setTable, isEditing, setIsEditing } =
    useOutletContext();
  const {
    user: { userId },
  } = useAuth();
  const {
    data: cholesterolsHistory,
    isFetching,
    isSuccess,
    isError,
  } = useGetCholesterolQuery(userId);
  const [checkCholesterol, { data, isLoading }] =
    useCheckCholesterolsMutation();
  const [cholesterolInputs, setCholesterolInput] = useState(initState);

  useEffect(() => {
    if (isSuccess) {
      setTable({
        columns: ["Date", "Time", "HDL", "LDL", "Total Cholesterol"],
        data: cholesterolsHistory
          .map((data) => ({
            Date: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("YYYY/MM/DD")
              : "-",
            Time: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("hh:mmA")
              : "-",
            LDL: data.ldl,
            HDL: data.hdl,
            "Total Cholesterol": data.totalCholesterol,
            readingId: data.readingId,
            recordedDateTime: data.recordedDateTime,
          }))
          .reverse(),
      });
    } else if (isError) {
      setTable(null);
    }
  }, [isFetching, isError, isSuccess, cholesterolsHistory, setTable]);

  useEffect(() => {
    if (isEditing) {
      setCholesterolInput({
        hdl: isEditing.HDL,
        ldl: isEditing.LDL,
        readingId: isEditing.readingId,
        recordedDateTime: isEditing.recordedDateTime,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setCholesterolInput((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCholesterol({
      userId,
      recordedDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ...cholesterolInputs,
    }).then(({ data }) => {
      if (data) {
        if (isEditing) {
          setIsEditing(false);
        }
        setCholesterolInput(initState);
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
    setCholesterolInput(initState);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
        <Input
          label="HDL"
          name="hdl"
          type="number"
          value={cholesterolInputs.hdl}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="LDL"
          name="ldl"
          type="number"
          value={cholesterolInputs.ldl}
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
      <div className="my-8">
        {data && !isEditing && (
          <ul className="list-disc">
            <li>{data?.hdlMessage}</li>
            <li>{data?.ldlMessage}</li>
            <li>{data?.totalCholesterolMessage}</li>
          </ul>
        )}
      </div>
    </>
  );
}
