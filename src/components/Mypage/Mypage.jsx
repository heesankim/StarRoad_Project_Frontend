import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import { ModalPortal } from "../modal/ModalPortal";
import { useModalStore } from "../../store/store";

import basicUserImage from "../../assets/user.webp";
import prevBtn from "../../assets/prev.webp";
import moveBtn from "../../assets/goBackIcon.webp";

import tempImage from "../../assets/main.jpg";

const userInfo = {
  name: "박덕배",
  email: "test@test.com",
  password: "user1234",
};
const travelSchedule = [
  {
    id: "1",
    image: basicUserImage,
    egPlaceName: "JEJU",
    koPlaceName: "제주",
    date: "2020.02.02 ~ 2020.02.20",
    updateDate: "2020.01.25",
    pickPlace: "1",
  },
  {
    id: "2",
    image: prevBtn,
    egPlaceName: "Busan",
    koPlaceName: "부산",
    date: "2021.03.03 ~ 2020.03.08",
    updateDate: "2021.02.28",
    pickPlace: "2",
  },
  {
    id: "3",
    image: tempImage,
    egPlaceName: "GANGWON",
    koPlaceName: "강원",
    date: "2022.09.02 ~ 2020.09.6",
    updateDate: "2022.08.25",
    pickPlace: "3",
  },
];

function UserInfoPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openModal } = useModalStore();
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;

    try {
      if (user.email === "" && user.password === "") {
        alert("수정할 내용이 없습니다.");
        return;
      } else {
        if (user.password) {
          if (!passwordRegex.test(newPassword)) {
            alert("비밀번호에 문자, 숫자, 특수문자를 포함해야 합니다.");
            return;
          } else if (user.password !== user.passwordConfirm) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
          const newEmail = user.email !== "" ? user.email : userInfo.email;
          const newPassword =
            user.password !== "" ? user.password : userInfo.password;

          const header = {
            header: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCrendentials: true,
          };
          const body = {
            // userName: userName.value.trim(),
            password: newPassword,
            email: newEmail,
          };
          const uri = "http://localhost:3000/users/";
          const updateResponse = await axios.patch(uri, body, header);

          console.log(updateResponse.data);
          alert("회원정보가 수정되었습니다.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(name, value); // name과 value 출력
    console.log(user);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % travelSchedule.length);
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? travelSchedule.length - 1 : prevIndex - 1
    );
  };

  const handleEditSchedule = () => {
    {
      /* 임시 */
    }
    alert(travelSchedule[currentIndex].id);
  };
  const handleWrite = () => {
    {
      /* 임시 */
    }
    alert(travelSchedule[currentIndex].id);
  };
  const handleDeletSchedule = () => {
    alert(travelSchedule[currentIndex].koPlaceName + " 일정이 삭제되었습니다.");
  };

  const openuUpdateUserInfoModal = () => {
    openModal({
      modalType: "updateUserInfo",
      style: {
        /*자유롭게 꾸며보세요!*/ backgroundColor: "rgb(249, 250, 251)",
        width: "60%",
        height: "85%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      title: (
        <div className="text-center font-bold text-4xl">회원정보 수정</div>
      ),
      content: (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center my-5 h-5/6"
        >
          <div className="w-1/6 mb-5 border bg-white border-gray-100 rounded-full flex items-center justify-center shadow-lg">
            <img className="h-full" src={basicUserImage} alt="유저이미지" />
          </div>
          <div className="grid grid-cols-none grid-rows-4 justify-center items-center w-5/12 border-solid grid-underline text-center">
            <div
              className="grid grid-cols-[1fr,2fr] h-4/5 items-center justify-center gap-3 p-2"
              style={{ borderBottom: "1px solid #6645B9" }}
            >
              <div className="text-lg cursor-pointer select-none">이름</div>
              <div className="text-lg select-none text-left">
                {userInfo.name}
              </div>
            </div>
            <label
              className="grid grid-cols-[1fr,2fr] h-full items-center justify-center gap-3 p-2"
              style={{ borderBottom: "1px solid #6645B9" }}
            >
              <div className="text-lg select-none">이메일</div>
              <input
                type="text"
                name="email"
                label="이메일"
                value={user.email}
                onChange={handleValueChange}
                // value={passwordConfirm}
                // onChange={(e) => setPasswordConfirm(e.target.value)}//
                placeholder={"이메일을 입력해주세요."}
                className="hide-input-focus outline-none w-full rounded border border-gray-100"
              />
            </label>
            <label
              className="grid grid-cols-[1fr,2fr]  h-full items-center justify-center gap-3 p-2"
              style={{ borderBottom: "1px solid #6645B9" }}
            >
              <div className="text-lg select-none">비밀번호</div>
              <input
                type="password"
                label="비밀번호"
                name="password"
                value={user.password}
                onChange={handleValueChange}
                minLength={10}
                maxLength={20}
                placeholder={"비밀번호를 입력해주세요."}
                className="hide-input-focus outline-none w-full rounded border border-gray-100"
              />
              {user.password !== user.passwordConfirm ? (
                <h6 className="text-xs text-rose-600 col-span-2">
                  비밀번호가 서로 다릅니다.
                </h6>
              ) : (
                <h6 className="text-xs text-violet-400 col-span-2">
                  비밀번호(문자,숫자,특수문자 포함 10~20자)
                </h6>
              )}
            </label>
            <label
              className="grid grid-cols-[1fr,2fr] h-full items-center justify-center gap-3 p-2"
              style={{ borderBottom: "1px solid #6645B9" }}
            >
              <div className="text-lg select-none">비밀번호 확인</div>
              <input
                type="password"
                label="비밀번호 확인"
                name="passwordConfirm"
                value={user.passwordConfirm}
                onChange={handleValueChange}
                minLength={10}
                maxLength={20}
                placeholder={"비밀번호를 다시 입력해주세요."}
                className="hide-input-focus outline-none w-full rounded border border-gray-100"
              />
            </label>
          </div>
          <input
            className="m-5 w-1/6 text-white font-bold text-lg px-4 py-2 rounded shadow-md"
            style={{ backgroundColor: "#B09FCE" }}
            type="submit"
            value="저장"
          />
        </form>
      ),
    });
  };

  return (
    <div className="w-full" style={{ height: "calc(100vh - 4rem)" }}>
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
          <div className="h-1/5 border border-gray-100 rounded-full flex items-center justify-center shadow-lg">
            <img className="h-full" src={basicUserImage} alt="유저이미지" />
          </div>
          <div className="text-gray-500 text-lg m-3">
            {userInfo.name}님 안녕하세요
          </div>
          <button
            onClick={openuUpdateUserInfoModal}
            style={{ backgroundColor: "#B09FCE" }}
            className="text-white font-bold text-lg px-4 py-2 rounded shadow-md"
          >
            프로필 수정
          </button>
          <div className="flex flex-row items-center w-1/5 h-1/5">
            <div className="grid grid-rows-[1fr,2fr] bg-gray-100 w-1/2 h-3/4 m-4 p-3 rounded-2xl">
              <div className="py-1 text-slate-500">나의 일정</div>
              <div
                className="text-5xl py-2 font-bold"
                style={{ color: "#6645B9" }}
              >
                {travelSchedule.length}
              </div>{" "}
              {/*임시*/}
            </div>
            <div className="grid grid-rows-[1fr,2fr] bg-gray-100 w-1/2 h-3/4 m-4 p-3 rounded-2xl">
              <div className="py-1 text-slate-500">나의 여행기</div>
              <div
                className="text-5xl py-2 font-bold"
                style={{ color: "#6645B9" }}
              >
                0
              </div>{" "}
              {/*임시*/}
            </div>
          </div>
          <div
            id="box"
            className="flex flex-col justify-center items-center m-4 bg-gray-100 rounded-2xl w-7/12 h-72 relative"
          >
            <div
              className="flex bg-transparent h-full w-1/12 absolute top-1/2 left-0 transform -translate-y-1/2 
      opacity-0  hover:opacity-100 transition-opacity duration-300
      "
              onClick={handleClickPrev}
            >
              <img
                id="prevBtn"
                src={moveBtn}
                alt="이전"
                className="w-2/5  object-contain"
              />
            </div>
            <div
              id="content"
              className="grid grid-cols-[1fr,1fr,2fr] grid-rows-1 h-5/6 w-11/12 bg-white rounded-2xl shadow-xl"
            >
              <div className="flex items-center justify-center p-5">
                <img
                  className="h-full"
                  src={travelSchedule[currentIndex].image}
                  alt="여행지 이미지"
                />
              </div>
              {/* 임시 */}
              <div className="flex flex-col justify-center">
                <div
                  className="text-4xl py-2 font-bold"
                  style={{ color: "#6645B9" }}
                >
                  {travelSchedule[currentIndex].egPlaceName}
                </div>
                {/* 임시 */}
                <div className="text-2xl py-2 font-bold text-gray-500">
                  대한민국 {travelSchedule[currentIndex].koPlaceName}
                </div>
                {/* 임시 */}
              </div>
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-[1fr,2fr] grid-rows-3 gap-4 m-7">
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#B09FCE" }}
                  >
                    여행일자
                  </div>
                  <div className="text-lg">
                    {travelSchedule[currentIndex].date}
                  </div>
                  {/* 임시 */}
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#B09FCE" }}
                  >
                    최종 수정 날짜
                  </div>
                  <div className="text-lg">
                    {" "}
                    {travelSchedule[currentIndex].updateDate}
                  </div>
                  {/* 임시 */}
                  <div
                    className="font-bold text-lg"
                    style={{ color: "#B09FCE" }}
                  >
                    선택장소
                  </div>
                  <div className="text-lg">
                    {travelSchedule[currentIndex].pickPlace}
                  </div>
                  {/* 임시 */}
                </div>

                <div className="flex flex-row justify-between mb-8 mx-7">
                  <button
                    onClick={handleEditSchedule}
                    style={{ backgroundColor: "#B09FCE" }}
                    className="text-white  text-lg w-1/3 h-12 p-2 rounded shadow-md"
                  >
                    일정 수정
                  </button>
                  <button
                    onClick={handleWrite}
                    style={{ backgroundColor: "#B09FCE" }}
                    className="text-white  text-lg w-1/3 h-12 p-2 mx-4 rounded shadow-md"
                  >
                    여행기 작성
                  </button>
                  <button
                    onClick={handleDeletSchedule}
                    style={{ backgroundColor: "#B09FCE" }}
                    className="text-white  text-lg w-1/3 h-12 p-2 rounded  shadow-md"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>

            <div
              className="flex bg-transparent h-full w-1/12 absolute top-1/2 right-0 transform -translate-y-1/2 justify-end opacity-0  hover:opacity-100 transition-opacity duration-300 "
              onClick={handleClickNext}
            >
              <img
                id="nextBtn"
                src={moveBtn}
                alt="다음"
                className="w-2/5  object-contain transform scale-x-[-1]"
              />
            </div>
          </div>
          <div>- {currentIndex + 1} -</div>
        </div>
      </div>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  );
}
export default UserInfoPage;
