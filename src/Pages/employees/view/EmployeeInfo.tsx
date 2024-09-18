import { useState } from "react";


const EmployeeInfo = ({ employee, refresh }: any) => {
  let data = [
    {
      title: "Employee ID",
      value: `${employee?.emp_id}` || "--",
    },
    {
      title: "Name",
      value: `${employee?.name}` || "--",
    },
    {
      title: "Email ID",
      value: `${employee?.email}` || "--",
    },
    {
      title: "Primary Number",
      value: `${employee?.phone}` || "--",
    },
    {
      title: "Department",
      value: `${employee?.department}` || "--",
    },
    {
      title: "Designation",
      value: `${employee?.designation}` || "--",
    },
    {
      title: "Card Status",
      value: `${employee?.card_status}` || "--",
    },
    {
      title: "Work Address",
      value: `${employee?.work_location}` || "--",
    },
  ];

  return (
    <div className="bg-white p-3 lg:p-6">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Employee Information</p>
      </div>

      <div className=" bg-lightshadedGray mt-4 p-4 min-h-[130px] max-h-full flex flex-col lg:grid lg:grid-cols-4 gap-10">
        {data?.map((item, index) => (
          <div
            key={item?.title}
            className="flex justify-between lg:flex-col lg:justify-start gap-2"
          >
            <p className="text-xs text-bluishGray">{item?.title}</p>
            <p className="text-sm text-shadeDarkBlue break-words">
              {item?.value ?? "--"}
            </p>
          </div>
        ))}
         <div
            className="flex justify-between lg:flex-col lg:justify-start gap-2"
          >
            <p className="text-xs text-bluishGray">Image</p>
            <p className="text-sm text-shadeDarkBlue break-words">
              {
                employee.image_base64 ? 
                <img
                className="w-20 h-20 rounded"
                src={employee.image_base64}
                alt="profile"
              />  : <>NA</>
              }
            </p>
            </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
