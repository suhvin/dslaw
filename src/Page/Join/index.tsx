import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import back from "../../../src/Asset/Img/Back/back_img10.jpg";
import Bottom from "./Component/Bottom";
import Button from "./Component/Button";
import { useNavigate } from "react-router-dom";
import onToast from "../../Component/Toast/onToast";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import join from "../../Asset/Music/music_join.mp3";
import { makeUser } from "../../Util/Api";
import { useUserStore } from "../../Store/user-store";

enum Stage {
  MISSION = "MISSION",
  MISSIONFAIL = "MISSIONFAIL",
  FIRST = "FIRST",
  FIRSTFAIL = "FIRSTFAIL",
  SECOND = "SECOND",
  SECONDFAIL = "SECONDFAIL",
  COMPLETE = "COMPLETE",
}

const Join = () => {
  // url 변경
  const navigate = useNavigate();

  // toast
  const toast = useToast();

  // 유저의 stage
  const [stage, setStage] = useState(Stage.MISSION);

  // zunstand
  const { userName, userUniv, userPw } = useUserStore();

  // 음악재생
  useEffect(() => {
    const audio = new Audio(join);
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const onClickBtn1 = () => {
    switch (stage) {
      case Stage.MISSION:
        setStage(Stage.FIRST);
        break;
      case Stage.MISSIONFAIL:
        setStage(Stage.FIRST);
        break;
      case Stage.FIRST:
        setStage(Stage.SECOND);
        break;
      case Stage.FIRSTFAIL:
        setStage(Stage.SECOND);
        break;
      case Stage.SECOND:
        setStage(Stage.COMPLETE);
        break;
      case Stage.SECONDFAIL:
        setStage(Stage.COMPLETE);
        break;
      default:
        break;
    }
  };

  const onClickBtn2 = () => {
    switch (stage) {
      case Stage.MISSION:
        setStage(Stage.MISSIONFAIL);
        break;
      case Stage.MISSIONFAIL:
        navigate("/");
        makeUser({
          name: userName,
          univ: userUniv,
          pw: userPw,
          mission: false,
          first: false,
          second: false,
        });
        onToast({
          toast: toast,
          status: "error",
          title: "미션을 참여하지 않으십니다!",
          description: "너무해.. 왜 안와.. 🥲",
        });
        break;
      case Stage.FIRST:
        setStage(Stage.FIRSTFAIL);
        break;
      case Stage.FIRSTFAIL:
        navigate("/");
        makeUser({
          name: userName,
          univ: userUniv,
          pw: userPw,
          mission: true,
          first: false,
          second: false,
        });
        onToast({
          toast: toast,
          status: "success",
          title: "미션만 신청! 1,2차는 불참",
          description: "미션 신청해줘서 감사 😆",
        });
        break;
      case Stage.SECOND:
        setStage(Stage.SECONDFAIL);
        break;
      case Stage.SECONDFAIL:
        navigate("/");
        makeUser({
          name: userName,
          univ: userUniv,
          pw: userPw,
          mission: true,
          first: true,
          second: false,
        });
        onToast({
          toast: toast,
          status: "success",
          title: "미션과 1차 신청! 2차는 불참",
          description: "1차까지 즐겁게 놀자! 😄",
        });
        break;
      default:
        break;
    }
  };

  return (
    <Container variants={variants} initial="init" animate="end">
      <img className="back" src={back} alt="" />
      <Bottom type={stage} />
      {stage !== Stage.COMPLETE && (
        <Button
          type={stage}
          onClickBtn1={onClickBtn1}
          onClickBtn2={onClickBtn2}
        />
      )}
    </Container>
  );
};

export default Join;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  .back {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
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
      duration: 5,
      bounce: 0.5,
    },
  },
};
