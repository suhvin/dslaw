import React, { useEffect, useState } from "react";
import back from "../../../src/Asset/Img/Back/back_img2.jpg";
import styled from "@emotion/styled";
import { useToast } from "@chakra-ui/react";
import onToast from "../../Component/Toast/onToast";
import { useNavigate } from "react-router-dom";
import pattern from "../../Asset/Img/pattern.png";
import Modal from "../../Component/Modal";
import { motion } from "framer-motion";
import preLoading from "../../Util/preLoading";
import opening from "../../Asset/Music/music_opening.mp3";

const Home = () => {
  // 이미지 로드 될 때까지 기다림
  const [loaded, setLoaded] = useState(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  // 투명도 조절
  const [opacity, setOpacity] = useState(0);
  let isOn = true;
  let count = 0;
  useEffect(() => {
    // 이미지 프리로딩
    preLoading();
    // 투명도 조절
    const intervalId = setInterval(() => {
      if (isOn) {
        if (count >= 1) {
          count = 0.9;
          isOn = false;
        } else {
          count += 0.05;
        }
      } else {
        if (count <= 0.3) {
          count = 0.4;
          isOn = true;
        } else {
          count -= 0.05;
        }
      }
      setOpacity(count);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  // 음악재생
  useEffect(() => {
    const audio = new Audio(opening);
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // toast 사용
  const toast = useToast();

  // 페이지 이동
  const navigate = useNavigate();

  // 모달 열기
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={back}
        onLoad={handleImageLoaded}
        alt=""
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <Container opacity={opacity} pattern={pattern}>
        {loaded && (
          <FramerDiv variants={variants} initial="init" animate="end">
            <img className="back" src={back} alt="" />
            <div className="bottom">
              <div className="margin" />
              <div className="choice on">
                <div className="pattern">
                  <Btn onClick={() => setIsOpen(true)}>미션 신청하기</Btn>
                </div>
              </div>
              <div className="choice">
                <Btn
                  onClick={() =>
                    onToast({
                      toast: toast,
                      status: "error",
                      title: "재판 시작까지 기다려주세요!",
                    })
                  }
                  style={{ opacity: 1 }}
                >
                  투표하러 가기
                </Btn>
              </div>
            </div>
          </FramerDiv>
        )}
      </Container>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        func={() => navigate("/join")}
        opacity={opacity}
      />
    </>
  );
};

export default Home;

const Container = styled.div<{ opacity: number; pattern: string }>`
  width: 100%;
  height: 100%;
  background-color: black;
  .back {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  .bottom {
    width: 100%;
    height: 160px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    .margin {
      width: 100%;
      height: 20px;
    }
    .choice {
      width: 200px;
      height: 40px;
      margin: 10px auto;
    }
    .on {
      border: 1px solid rgba(178, 147, 28, ${(props) => props.opacity});
      .pattern {
        width: 100%;
        height: 100%;
        border: 3px solid;
        border-image-source: url(${(props) => props.pattern});
      }
    }
  }
`;

const FramerDiv = styled(motion.div)``;

const Btn = styled.div`
  width: 180px;
  height: 28px;
  margin: 2px auto;
  background-color: #357187;
  color: white;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const variants = {
  init: {
    opacity: 0,
    scale: 1,
    x: 0,
  },
  end: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0.5,
    },
  },
};
