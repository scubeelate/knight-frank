import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Validator from "validatorjs";
import { axiosInstance } from "../utils/axios";
import { getUserBaseModulePath, showToastMessage } from "../utils/helpers";
import { useSelector } from "react-redux";
import { encryptAESKey, encryptServerDataUsingKey, generateAESKey } from "../utils/encryption";

const fields = {
  email: "",
  password: "",
};

const Login = () => {
  const [params, setParams] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(fields);
  const [isHidden, setIsHidden] = useState(true);
  const { serverPublicKey } = useSelector(
    (state: any) => state.app_central_store,
  )
  const navigate = useNavigate();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const validation = new Validator(
      params,
      {
        email: "email|required",
        password: "required|min:8|max:14",
      },
      {
        required: "*required",
      }
    );

    if (validation.fails()) {
      const fieldErrors: any = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });
      setFormErrors(fieldErrors);
      return false;
    }
    setIsLoading(true);
    let payload = {...params}
    let aesKey:any = await generateAESKey()
    let encryptPassword = await encryptServerDataUsingKey(payload.password,aesKey)
    let encryptEmail = await encryptServerDataUsingKey(payload.email,aesKey)
    let encryptKey = await encryptAESKey(aesKey,serverPublicKey)
    const reqPayload = {
      email: encryptEmail,
      password:encryptPassword
    }
    axiosInstance
      .post("/login", reqPayload,{ headers: {'Encrypted-Key': encryptKey}})
      .then((response) => {
        setIsLoading(false);
        let user = response.data
        const userInfo = {
          id: user.id,
          name: user.name,
          email: user.email,
          user_permissions: user.user_permissions
        }
        localStorage.setItem("auth-user", JSON.stringify(userInfo));
        localStorage.setItem("user-token", user.token);
        navigate(getUserBaseModulePath(userInfo))
      })
      .catch((error) => {
        setIsLoading(false);
        showToastMessage(error.message, "error");
      });

  };

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    setParams({
      ...params,
      [name]: value,
    });
    setFormErrors(fields);
  };

  const handleSSOLogin = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    axiosInstance
      .get("/sso/login")
      .then((response) => {
        setIsLoading(false);
       console.log(response);
       if(response.data.url) {
        location.href = response.data.url
       }

      })
      .catch((error) => {
        setIsLoading(false);
        showToastMessage(error.message, "error");
      });

  };

  return (
    <div className="grid w-full h-screen grid-cols-2 items-center">
      <div className="w-full h-full flex items-center bg-appTheme ">
        <div className=" w-full space-y-6 ">
          <img alt='scube-logo' src="/assets/images/scube_brand_logo.webp" className="m-auto" />
          <p className=" body1 text-white text-center">
            Transforming vision into digital realities!
          </p>
        </div>
      </div>
      <div className=" flex  items-center justify-center w-2/3 m-auto">
        <div className="space-y-6">
          <h3 className="text-center font-bold">
            Welcome to Scube Enterprise Smart Business Card
          </h3>
          <p className="title3 text-slateGray text-center">
            Please sign-in to your account to manage the cards of Employees!
          </p>
          <form  onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full lg:my-12 my-6">
            <Input
              type="text"
              name="email"
              value={params.email}
              handleChange={handleChange}
              label="Email"
              error={formErrors?.email?.length > 0}
              helperText={formErrors?.email}
            />

            <div className="relative w-full">
              <Input
                type={isHidden ? "password" : "text"}
                name="password"
                value={params.password}
                handleChange={handleChange}
                label="Password"
                error={formErrors?.password?.length > 0}
                helperText={
                  formErrors?.password?.includes("required")
                    ? formErrors?.password
                    : ""
                }
              />

              <button
                onClick={() => {
                  setIsHidden((prevState) => !prevState);
                }}
                className="absolute top-3 right-3 flex items-center justify-end"
                type="button"
              >
                <img
                  width={24}
                  height={24}
                  src={
                    isHidden
                      ? "/assets/icons/hidden.svg"
                      : "/assets/icons/shown.svg"
                  }
                  alt="eye"
                  className="cursor-pointer"
                />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <CustomButton
              loading={isLoading}
              text="Login"
              classes="bg-darkshadeBlue w-full text-white  px-20  py-3"
              type="submit"
            />
          </div>
          {/* <p>OR</p>
          <div className="flex justify-center">
            <CustomButton
              loading={isLoading}
              handleClick={handleSSOLogin}
              text="SSO Login"
              classes="bg-darkshadeBlue rounded-lg text-white w-7/12 px-20  py-3"
            />
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;