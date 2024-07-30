import { useEffect, useState } from "react";
import HeadingTab from "../../components/HeadingTab";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { ValidateFields } from "../../utils/validator";
import TextArea from "../../components/TextArea";
import FileUpload from "../../components/FileUpload";
import { axiosInstance } from "../../utils/axios";
import {
  checkModulePrivilegeAccess,
  showToastMessage,
  validatePhoneNumber,
} from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import SelectInput from "../../components/SelectInput";
import { decryptAESKey, decryptServerData, encryptAESKey, encryptServerDataUsingKey, generateAESKey } from "../../utils/encryption";
import { useSelector } from "react-redux";

const Form = ({ id }: any) => {

  const { serverPublicKey,clientPrivateKey } = useSelector(
    (state: any) => state.app_central_store,
  )

  const navigate = useNavigate();

  let fields = {
    emp_id: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    work_location: "",
    image_base64: "",
    blood_group: "",
  };

  const [params, setParams] = useState(fields as any);
  const [errors, setErrors] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    if (e.url) {
      const { url } = e;

      setParams({ ...params, image_base64: url });
    } else {
      const { name, value } = e.target;
      setParams({ ...params, [name]: value });
      setErrors(fields);
    }
  };

  const handleSubmit = async () => {
    let fields = ['name','department','designation','emp_id']
    let isError = false;
    let FieldErrors:any = {...errors}
    for(let field of fields) {
      const regX = /^[a-zA-Z0-9\s\.&(),-]+$/;
      if (params[field] && !regX.test(params[field])){
        FieldErrors[field] = 'Invalid '+ field 
        isError= true
      }
    }

    if(params.phone && !validatePhoneNumber(params.phone)) {
      FieldErrors['phone'] = 'Please Enter Valid No'
      isError= true
    }

    let emailRegx = /\S+@\S+\.\S+/;
    if (params.email && !emailRegx.test(params.email)){
      FieldErrors['email'] = 'Invalid Email'
      isError= true
    }
    
    let addressRex = /^[a-zA-Z0-9\s\-.,#]+$/;
    if (params.work_location && !addressRex.test(params.work_location)){
      FieldErrors['work_location'] = 'Invalid Work Location'
      isError= true
    }
    
    const bloodGroupRegex = /^(A|B|AB|O)[+-]?$/;
    if (params.blood_group && !bloodGroupRegex.test(params.blood_group)){
      FieldErrors['blood_group'] = 'Invalid Blood Group'
      isError= true
    }

    if(isError) {
      setErrors(FieldErrors);
      return
    }

    const validationError = ValidateFields(params, {
      emp_id: "required|max:20",
      name: "string|required|max:150",
      email: "string|max:100|email",
      phone: "string|max:13",
      department: "string|max:100",
      designation: "string|max:100",
      work_location: "string|max:2000",
    });

    if (typeof validationError === "object") {
      setErrors(validationError);
      return;
    }
    
    setIsLoading(true);

    const endpoint = id ? `/employees/${id}` : `employees`;
    let payload = {...params}

    let aesKey = await generateAESKey()
    let encryptKey = await encryptAESKey(aesKey,serverPublicKey)
    const encryptionPromises = [
      'name', 'designation', 'department', 'phone',
      'email', 'emp_id', 'blood_group'
    ].map(async (property) => {
      if (payload[property]) {
        payload[property] = await encryptServerDataUsingKey(payload[property],aesKey)
      }
    });

    await Promise.all(encryptionPromises);
    const request = id
      ? axiosInstance.put(endpoint, payload,{ headers: {'Encrypted-Key': encryptKey}})
      : axiosInstance.post(endpoint, payload,{ headers: {'Encrypted-Key': encryptKey}});
    request
      .then((response: any) => {
        setParams(fields);
        showToastMessage(response?.data?.message, "success");
        navigate("/admin/employees");
      })
      .catch((error) => {
        showToastMessage(error?.message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getEmployeeById = (id: any) => {
    axiosInstance
      .get(`/employees/${id}`)
      .then(async (res) => {
        let response = res?.data?.data;
        const  key = await decryptAESKey(res?.data.x_key,clientPrivateKey)
        response['name'] = await decryptServerData(response.name,key)
        response['designation'] = await decryptServerData(response.designation,key)
        response['department'] = await decryptServerData(response.department,key)
        response['phone'] = await decryptServerData(response.phone,key)
        response['email'] = await decryptServerData(response.email,key)
        response['emp_id'] = await decryptServerData(response.emp_id,key)
        if(response.blood_group)   response['blood_group'] = await decryptServerData(response.blood_group,key)

        setParams({ ...params, ...response });
      })
      .catch((error) => {
        showToastMessage(error.message, "error");
      });
  };

  useEffect(() => {
    if (id) {
      getEmployeeById(id);
    }
  }, [id]);

  const removeImage = (name: string) => {
    setParams({ ...params, [name]: "" });
  };

  return (
    <div className="">
      <div className="w-full bg-white p-6">
        <HeadingTab heading="Employee Details" />

        <div className="grid grid-cols-2 gap-6 py-10">
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            value={params?.emp_id}
            error={!!errors?.emp_id}
            helperText={errors?.emp_id}
            handleChange={handleChange}
            label="Employee ID"
            name="emp_id"
          />
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            error={!!errors?.name}
            helperText={errors?.name}
            value={params?.name}
            handleChange={handleChange}
            label="Employee Name"
            name="name"
          />
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            error={!!errors?.email}
            helperText={errors?.email}
            value={params?.email}
            handleChange={handleChange}
            label="Email ID"
            name="email"
          />
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            error={!!errors?.phone}
            helperText={errors?.phone}
            value={params?.phone}
            handleChange={handleChange}
            label="Phone Number"
            name="phone"
          />
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            error={!!errors?.department}
            helperText={errors?.department}
            value={params?.department}
            handleChange={handleChange}
            label="Department"
            name="department"
          />
          <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            error={!!errors?.designation}
            helperText={errors?.designation}
            value={params?.designation}
            handleChange={handleChange}
            label="Designation"
            name="designation"
          />
         
          <FileUpload
            imageUrl={params?.image_base64}
            styleType={"lg"}
            setImage={handleChange}
            acceptMimeTypes={["image/jpeg", "image/png"]}
            title="Upload or Drag and Drop image"
            label="File Format: .jpeg/ .png"
            id="image_base64"
            maxSize={1}
            removeImage={() => {
              removeImage("image_base64");
            }}
            filename="image_base64"
            error={errors?.image_base64}
          />{" "}
          <TextArea
            rows={8}
            error={!!errors?.work_location}
            helperText={errors?.work_location}
            placeholder="Work Location"
            value={params?.work_location}
            handleChange={handleChange}
            name="work_location"
          />
           <Input
            rows={1}
            width="w-full"
            disabled={false}
            readOnly={false}
            value={params?.blood_group}
            error={!!errors?.blood_group}
            helperText={errors?.blood_group}
            handleChange={handleChange}
            label="Blood Group"
            name="blood_group"
          />
        </div>
      </div>

      { checkModulePrivilegeAccess("employees", "is_write") ||
        checkModulePrivilegeAccess("employees", "is_update") ? (
        <div className="w-full flex justify-end items-center gap-4 pt-6">
          <Link to="/admin/employees">
            <CustomButton
              text="Cancel"
              classes="bg-none border text-black border-black w-fit px-4   py-2"
            />
          </Link>
          <CustomButton
            loading={isLoading}
            handleClick={handleSubmit}
            text="Submit Details"
            classes="bg-darkshadeBlue text-white w-fit px-20   py-2"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Form;
