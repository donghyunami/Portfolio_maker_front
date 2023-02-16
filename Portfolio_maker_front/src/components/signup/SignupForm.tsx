import api from "@/libs/axios/api";
import token from "@/libs/token";
import AuthResponse from "@/models/auth";
import LoginRequest, { AuthRequest } from "@/models/auth";
import MainButton from "@/styles/ui-components/styled-button";
import Path from "@utils/routes/Path";
import { useCallback, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
const SignupForm = () => {
  const navigate = useNavigate();

  const { HOME } = Path;

  const userEmailRef = useRef<HTMLInputElement | null>(null);
  const userPasswordFormRef = useRef<HTMLInputElement | null>(null);
  const userPasswordFirmFormRef = useRef<HTMLInputElement | null>(null);
  const userFullnameRef = useRef<HTMLInputElement | null>(null);

  const [canSeePW, setCanSeePW] = useState<boolean>(false);
  const [canSeeFirmPW, setCanSeeFirmPW] = useState<boolean>(false);

  // 가입신청 공백체크
  const [validPassed, setValidPassed] = useState<boolean>(false);

  return (
    <section className="flex flex-col w-[60vw] gap-8 items-center justify-center bg-white py-4 px-6 border rounded-xl shadow-md">
      <div className="w-full text-left text-2xl">
        {/* <SignHeaderItem /> */}
        <h1 className="text-2xl py-2 font-bold">회원가입</h1>
        <div className="w-full border-b" />
      </div>
      <section className="w-full flex flex-col gap-2">
        {/* 아이디 */}
        <fieldset className="w-full flex flex-col gap-1">
          <p
            className={`font-bold after:content-['*'] after:ml-0.5 after:text-red-500`}
          >
            아이디(이메일)
          </p>
          <input
            className={`border w-full leading-8 rounded-sm `}
            type="email"
            name="email"
            ref={userEmailRef}
            onChange={(evt) => {
              const newregisterEmail = evt.target.value;
              console.log(newregisterEmail);
            }}
            required
          />
        </fieldset>
        {/* 비밀번호 */}
        <fieldset className="w-full flex flex-col gap-1">
          <p
            className={`font-bold after:content-['*'] after:ml-0.5 after:text-red-500`}
          >
            비밀번호
          </p>
          <label className="relative">
            <input
              ref={userPasswordFormRef}
              className={`border w-full leading-8 rounded-sm valid:border-success`}
              type={canSeePW ? "text" : "password"}
              name="password"
              onChange={(evt) => {
                // Check if 한글입력 등 when type="text"
                const passwordExp = /[^A-Za-z\d$@$!%*#?&]/g;
                const newRegisterPassword = evt.target.value;
                newRegisterPassword.replace(passwordExp, "");
              }}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"
              required
            />
            <span
              className="absolute right-0 top-0 bottom-0 flex items-center -translate-x-1/2"
              onClick={() => {
                setCanSeePW(!canSeePW);
              }}
            >
              {canSeePW && (
                <AiFillEye className="text-gray-600 min-w-[1.5rem] min-h-[1.5rem]" />
              )}
              {!canSeePW && (
                <AiFillEyeInvisible className="text-gray-600 min-w-[1.5rem] min-h-[1.5rem]" />
              )}
            </span>
          </label>
        </fieldset>
        {/* 비밀번호 확인 */}
        <fieldset className="w-full flex flex-col gap-1">
          <p
            className={`font-bold after:content-['*'] after:ml-0.5 after:text-red-500`}
          >
            비밀번호 확인
          </p>
          <label className="relative">
            <input
              ref={userPasswordFirmFormRef}
              className={`border w-full leading-8 rounded-sm valid:border-success`}
              type={canSeeFirmPW ? "text" : "password"}
              name="password"
              onChange={(evt) => {
                // Check if 한글입력 등 when type="text"
                const passwordExp = /[^A-Za-z\d$@$!%*#?&]/g;
                const newRegisterFirmPassword = evt.target.value;
                newRegisterFirmPassword.replace(passwordExp, "");
              }}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"
              required
            />
            <span
              className="absolute right-0 top-0 bottom-0 flex items-center -translate-x-1/2"
              onClick={() => {
                setCanSeeFirmPW(!canSeeFirmPW);
              }}
            >
              {canSeeFirmPW && (
                <AiFillEye className="text-gray-600 min-w-[1.5rem] min-h-[1.5rem]" />
              )}
              {!canSeeFirmPW && (
                <AiFillEyeInvisible className="text-gray-600 min-w-[1.5rem] min-h-[1.5rem]" />
              )}
            </span>
          </label>
        </fieldset>
        {/* 이름 */}
        <fieldset className="w-full flex flex-col gap-1">
          <p
            className={`font-bold after:content-['*'] after:ml-0.5 after:text-red-500`}
          >
            이름
          </p>
          <input
            className={`border w-full leading-8 rounded-sm`}
            type="text"
            name="fullname"
            ref={userFullnameRef}
            onChange={(evt) => {
              evt.target.value = evt.target.value.replace(/[^ㄱ-ㅎ가-힣]/g, "");
            }}
            required
          />
        </fieldset>
      </section>
      <MainButton
        className={`w-full !py-4 !rounded-lg font-bold text-3xl ${
          !validPassed ? "bg-default" : ""
        }`}
        disabled={validPassed}
        onClick={() => {
          if (validPassed) {
            console.log("값이 비워져있음");
          }

          const reqData: AuthRequest = {
            email: userEmailRef.current?.value ?? "",
            name: userFullnameRef.current?.value ?? "",
            password: userPasswordFirmFormRef.current?.value ?? "",
          };

          api
            .post<AuthResponse>("/api/users", reqData)
            .then(({ data }) => {
              console.log(data);
              token.setToken("token", data.token);

              // FIXME 성공하면 주석풀고 홈으로
              // navigate(HOME, { replace: true });
            })
            .catch(console.error);
        }}
      >
        가입신청
      </MainButton>
    </section>
  );
};

export default SignupForm;
