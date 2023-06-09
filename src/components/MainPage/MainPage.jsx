import React, { useState, useRef, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";
import Modal from "../modal/modal";
import { ModalPortal } from "../modal/ModalPortal";
import { useModalStore } from "../../store/store";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const MainPageComponent = () => {
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    getLocation();
    if (cookies.token && !localStorage.getItem("isLogin")) {
      localStorage.setItem("isLogin", "1");
      window.location.reload();
    }
  }, [cookies]);

  const images = [
    "/assets/main2.webp",
    "/assets/busan.webp",
    "/assets/seoul2.webp",
    "/assets/youngwol.webp",
    "/assets/jeonju.jpg",
    "/assets/busan3.webp",
    "/assets/gangwon2.webp",
  ]; // 임시 데이터
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const movePoint = useRef();
  const scrollBtn = () => {
    movePoint.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [destination, setDestination] = useState([]);
  const getLocation = async () => {
    const apiUrl =
      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
        ? import.meta.env.VITE_APP_API_DEV_URL
        : import.meta.env.VITE_APP_API_PROD_URL;
    const result = await axios.get(`${apiUrl}/destinations`);
    setDestination(result.data.data.destinations);
  };

  const { openModal } = useModalStore();
  const { closeModal } = useModalStore();
  const openInfoModal = (item) => {
    const introduction = JSON.stringify(item.introduction);
    const introductionText = introduction.replace(/"/g, "");
    openModal({
      modalType: "info",
      style: {
        backgroundColor: "white",
        width: "90rem",
        height: "35rem",
        borderRadius: "4px",
        overflow: "hidden",
      },
      title: (
        // <div className="text-center font-bold text-4xl">{item.name_ko}</div>
        <div style={{ display: "none", width: "0", height: "0" }}></div>
      ),
      content: (
        <div>
          <section
            className="overflow-hidden shadow-2xl md:grid md:grid-cols-3"
            style={{
              height: "90rem",
            }}
          >
            <div>
              <img
                alt="Trainer"
                src={item.image}
                className=" w-full"
                style={{ height: "35%" }}
              />
            </div>

            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest">
                {item.nameKo}에 관심이 있다면 여행을 계획해보세요!
              </p>

              <h2 className="mt-6 font-black uppercase">
                <span className="text-4xl font-black sm:text-5xl lg:text-6xl mb-10">
                  {item.nameEn}
                </span>

                <span
                  className="mt-16 block text-base font-medium"
                  style={{ textAlign: "left", height: "6rem" }}
                >
                  {introductionText}
                </span>
              </h2>
              <Link
                className="mt-16 inline-block w-1/3 mr-20  bg-violet-400 hover:bg-violet-500 py-4 text-sm font-bold uppercase tracking-widest text-white"
                to={`/plannerMap/${item.id}`}
                onClick={closeModal}
              >
                일정 만들기
              </Link>
              <Link
                className="mt-8 inline-block w-1/3 bg-violet-400 hover:bg-violet-500 py-4 text-sm font-bold uppercase tracking-widest text-white"
                to={"/travelBoard"}
                onClick={closeModal}
              >
                여행기
              </Link>

              <p className="mt-8 text-xs font-medium uppercase text-gray-400">
                starRoad
              </p>
            </div>
          </section>
        </div>
      ),
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div>
          <div
            className="absolute top-14"
            style={{
              display: "fixed",
              // fontWeight: "bold",
              fontSize: "3rem",
              marginBottom: "1rem",
              backgroundColor: "rgba( 255, 255, 255, 0.5 )",
              width: "38rem",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "fixed",
                textAlign: "center",
                color: "#845ec2",
                marginTop: "35vh",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              여행을 도와드릴게요
            </div>
            <div
              className="mb-8"
              style={{
                textAlign: "center",
                color: "#845ec2",
                fontWeight: "900",
              }}
            >
              starRoad
            </div>
            <button
              style={{
                display: "fixed",
                fontSize: "1rem",
                fontWeight: "700",
                textAlign: "center",
                marginLeft: "11rem",
                color: "white",
                width: "15rem",
                padding: "0.5rem",
                borderRadius: "2px",
              }}
              className="bg-violet-500 hover:bg-violet-600"
              onClick={scrollBtn}
            >
              여행 시작하기
            </button>
          </div>
          <img
            src="/assets/main123.jpg
            "
            className="mainImg"
            style={{ marginBottom: "10rem" }}
          />
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            width: "",
          }}
        >
          <Link to="/travelBoard">
            <img
              src={images[currentIndex]}
              alt="Slide"
              className=""
              style={{
                width: "80%",
                height: "28rem",
                objectFit: "cover",
                margin: "auto",
                boxShadow: "1px 4px 4px black",
                borderRadius: "4px",
              }}
            />
          </Link>

          <button
            onClick={previousSlide}
            className="absolute top-1/2 transform -translate-y-1/2 "
            style={{ marginLeft: "12%" }}
          >
            <img src="/assets/prev.webp" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 "
            style={{ marginLeft: "84%" }}
          >
            <img src="/assets/next.webp" />
          </button>
        </div>
      </div>
      <div
        ref={movePoint}
        style={{
          marginTop: "5rem",
          maxWidth: "100%",
          position: "relative",
          // display: "inline-block",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        떠나고 싶은 여행지를 선택하세요!
      </div>
      <div
        style={{
          marginLeft: "5rem",
          fontSize: "1.5rem",
          marginTop: "2rem",
          fontWeight: "700",
          color: "#2C2C2C",
        }}
      >
        지역
      </div>
      <div
        style={{ marginLeft: "5rem", marginRight: "5rem", marginTop: "1rem" }}
      >
        <div className="grid grid-cols-4 gap-4">
          {destination.map((item, idx) => (
            <div
              className="bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
              key={idx}
            >
              <img
                onClick={() => openInfoModal(item)}
                className="card-image hover:scale-95 hover:brightness-125 hover:bg-gray-100 hover:bg-opacity-0 transition duration-500"
                src={item.image}
                alt=""
                style={{ height: "70%", width: "100%", cursor: "pointer" }}
              />

              <div className="p-10">
                <h5 className="mb-2 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {item.nameEn}
                </h5>
                <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-200">
                  {item.nameKo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-24 bottom-8 bg-gray-50 hover:bg-gray-200 text-gray-500 py-3 px-6 m-auto"
        onClick={scrollToTop}
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: "5%",
        }}
      >
        맨 위로 올라가기
      </button>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  );
};

export default MainPageComponent;
