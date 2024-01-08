import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DenseTable from "./Table";

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [studentList, setStudentList] = useState([]);

  const onClickHandler = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .catch(() => {
        alert("Fail to add");
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudentList(result);
      })
      .catch(()=>{alert("Fail to retrieve")});
  }, [studentList]);

  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center px-[500px] gap-4">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex justify-center py-4 px-[650px]">
        <Button variant="contained" fullWidth onClick={onClickHandler}>
          Add Student
        </Button>
      </div>
      <div className="px-[400px]">
        <DenseTable rows={studentList}/>
      </div>
    </div>
  );
}
