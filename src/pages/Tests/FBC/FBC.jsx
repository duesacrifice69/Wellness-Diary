import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";

import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { useCheckFbcsMutation, useGetFbcQuery } from "../../../api";

const initState = {
  hemoglobin: "",
  whiteBloodCellCount: "",
  plateletCount: "",
  rbc: "",
  neutrophils: "",
  eosinophils: "",
  lymphocytes: "",
};

export default function FBC() {
  const { setNotification, setTable, isEditing, setIsEditing } =
    useOutletContext();
  const {
    user: { userId },
  } = useAuth();
  const {
    data: bloodPressuresHistory,
    isFetching,
    isSuccess,
    isError,
  } = useGetFbcQuery(userId);
  const [checkBloodPressure, { data, isLoading }] = useCheckFbcsMutation();
  const [fbcInputs, setFbcInputs] = useState(initState);

  useEffect(() => {
    if (isSuccess) {
      setTable({
        columns: [
          "Date",
          "Time",
          "Hemoglobin",
          "Platelet",
          "WBC",
          "RBC",
          "Neutrophils",
          "Eosinophils",
          "Lymphocytes",
        ],
        data: bloodPressuresHistory
          .map((data) => ({
            Date: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("YYYY/MM/DD")
              : "-",
            Time: data.recordedDateTime
              ? dayjs(data.recordedDateTime).format("hh:mmA")
              : "-",
            Hemoglobin: data.hemoglobin,
            WBC: data.whiteBloodCellCount,
            Platelet: data.plateletCount,
            RBC: data.rbc,
            Neutrophils: data.neutrophils,
            Eosinophils: data.eosinophils,
            Lymphocytes: data.lymphocytes,
            readingId: data.readingId,
            recordedDateTime: data.recordedDateTime,
          }))
          .reverse(),
      });
    } else if (isError) {
      setTable(null);
    }
  }, [isFetching, isSuccess, isError, bloodPressuresHistory, setTable]);

  useEffect(() => {
    if (isEditing) {
      setFbcInputs({
        whiteBloodCellCount: isEditing.WBC,
        hemoglobin: isEditing.Hemoglobin,
        plateletCount: isEditing.Platelet,
        rbc: isEditing.RBC,
        neutrophils: isEditing.Neutrophils,
        eosinophils: isEditing.Eosinophils,
        lymphocytes: isEditing.Lymphocytes,
        readingId: isEditing.readingId,
        recordedDateTime: isEditing.recordedDateTime,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setFbcInputs((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkBloodPressure({
      userId,
      recordedDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ...fbcInputs,
    }).then(({ error }) => {
      if (error) {
        setNotification({
          type: "error",
          message: "Something went wrong",
          timestamp: new Date(),
        });
      } else {
        if (isEditing) {
          setIsEditing(false);
        }
        setFbcInputs(initState);
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFbcInputs(initState);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
        <Input
          label="Hemoglobin"
          name="hemoglobin"
          type="number"
          value={fbcInputs.hemoglobin}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="White BloodCell Count"
          name="whiteBloodCellCount"
          type="number"
          value={fbcInputs.whiteBloodCellCount}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Platelet Count"
          name="plateletCount"
          type="number"
          value={fbcInputs.plateletCount}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Red BloodCell Count"
          name="rbc"
          type="number"
          value={fbcInputs.rbc}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Neutrophils"
          name="neutrophils"
          type="number"
          value={fbcInputs.neutrophils}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Eosinophils"
          name="eosinophils"
          type="number"
          value={fbcInputs.eosinophils}
          onChange={handleChange}
          required
          small
        />
        <Input
          label="Lymphocytes"
          name="lymphocytes"
          type="number"
          value={fbcInputs.lymphocytes}
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
            <li>{data?.eosinophilsMessage}</li>
            <li>{data?.hemoglobinMessage}</li>
            <li>{data?.lymphocytesMessage}</li>
            <li>{data?.neutrophilsMessage}</li>
            <li>{data?.plateletCountMessage}</li>
            <li>{data?.whiteBloodCellCountMessage}</li>
            <li>{data?.rbcMessage}</li>
          </ul>
        )}
      </div>
    </>
  );
}
