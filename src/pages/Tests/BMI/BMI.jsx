import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { useCheckBmiMutation, useGetBmiQuery } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";

const initState = {
  weight: "",
  height: "",
};

export default function BMI() {
  const { setNotification, setTable, isEditing, setIsEditing } =
    useOutletContext();
  const {
    user: { userId },
  } = useAuth();
  const {
    data: bmiHistory,
    isFetching,
    isSuccess,
    isError,
  } = useGetBmiQuery(userId);
  const [checkBmi, { data, isLoading }] = useCheckBmiMutation();
  const [bmiInputs, setBmiInputs] = useState(initState);

  useEffect(() => {
    if (isSuccess) {
      setTable({
        columns: [
          "Date",
          "Time",
          "Weight",
          "Height",
          "BMI",
          "Category",
          "Description",
        ],
        data: bmiHistory
          .map((data) => ({
            Date: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("YYYY/MM/DD")
              : "-",
            Time: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("hh:mmA")
              : "-",
            Height: data.heightInCm + "cm",
            Weight: data.weightInKg + "kg",
            BMI: data.bmi.toFixed(2),
            Category: data.category,
            Description: data.message,
            readingId: data.readingId,
            recordedDateTime: data.recordedDateTime,
          }))
          .reverse(),
      });
    } else if (isError) {
      setTable(null);
    }
  }, [isFetching, isError, isSuccess, bmiHistory, setTable]);

  useEffect(() => {
    if (isEditing) {
      setBmiInputs({
        height: isEditing.Height,
        weight: isEditing.Weight,
        readingId: isEditing.readingId,
        recordedDateTime: isEditing.recordedDateTime,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setBmiInputs((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkBmi({
      userId,
      recordedDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ...bmiInputs,
    }).then(({ data }) => {
      if (data) {
        setNotification({
          type: "info",
          message: `Your BMI category is ` + data.category,
          timestamp: new Date(),
        });
        if (isEditing) {
          setIsEditing(false);
        }
        setBmiInputs(initState);
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
    setBmiInputs(initState);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
        <Input
          label="Height (cm)"
          name="height"
          type="number"
          value={bmiInputs.height}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          value={bmiInputs.weight}
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
      {!isEditing && <div className="my-8">{data?.message}</div>}
    </>
  );
}
