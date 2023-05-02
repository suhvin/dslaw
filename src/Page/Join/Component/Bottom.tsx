import React, { useEffect } from "react";
import styled from "@emotion/styled";
import man1 from "../../../../src/Asset/Img/Man/man_img1.png";
import man2 from "../../../../src/Asset/Img/Man/man_img2.png";
import man3 from "../../../../src/Asset/Img/Man/man_img3.png";
import man4 from "../../../../src/Asset/Img/Man/man_img4.png";
import man5 from "../../../../src/Asset/Img/Man/man_img5.png";
import man6 from "../../../../src/Asset/Img/Man/man_img6.png";
import man7 from "../../../../src/Asset/Img/Man/man_img7.png";
import man8 from "../../../../src/Asset/Img/Man/man_img8.png";
import man9 from "../../../../src/Asset/Img/Man/man_img9.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import onToast from "../../../Component/Toast/onToast";
import { useUserStore } from "../../../Store/user-store";
import { makeUser } from "../../../Util/Api";

enum Stage {
  MISSION = "MISSION",
  MISSIONFAIL = "MISSIONFAIL",
  FIRST = "FIRST",
  FIRSTFAIL = "FIRSTFAIL",
  SECOND = "SECOND",
  SECONDFAIL = "SECONDFAIL",
  COMPLETE = "COMPLETE",
}

type Props = {
  type: string;
};

const Bottom = ({ type }: Props) => {
  const { userName, userUniv, userPw } = useUserStore();

  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (type === Stage.COMPLETE) {
      setTimeout(() => {
        navigate("/");
        makeUser({
          name: userName,
          univ: userUniv,
          pw: userPw,
          mission: true,
          first: true,
          second: true,
        });
        onToast({
          toast: toast,
          status: "success",
          title: "미션과 1차 2차 모두 신청!",
          description: "전부 신청해주셔서 감사감사 😎",
        });
      }, 2000);
    }
  }, [type, navigate, toast]);

  const renderText = () => {
    switch (type) {
      case Stage.MISSION:
        return (
          <p className="text">
            반갑군 {userName}! 내 이름은 나루호도!
            <br />
            나와 함께 드스재판을 하러가지 않겠나?
          </p>
        );
      case Stage.MISSIONFAIL:
        return (
          <p className="text">
            아니..! 그럴수가?!?!
            <br />
            혹시 여행이라도 가는건가? 어째서?
          </p>
        );
      case Stage.FIRST:
        return (
          <p className="text">
            좋아! 잘 선택했어!
            <br />
            그럼 재판 날 밥도 먹는 거 어때?
          </p>
        );
      case Stage.FIRSTFAIL:
        return (
          <p className="text">
            정말 나랑 밥 먹을 생각이 없나?
            <br />
            이건 감점 요인이야!
          </p>
        );
      case Stage.SECOND:
        return (
          <p className="text">
            훌륭해! 이미 자네는 훌륭한 변호사야!
            <br />
            마지막으로 묻겠네, 술은 어떤가? ㅎㅎ
          </p>
        );
      case Stage.SECONDFAIL:
        return (
          <p className="text">
            흠흠.. 술 한 잔 하고 싶었는데 말이지..
            <br />
            하지만 꼭 안마셔도 괜찮네!
          </p>
        );
      case Stage.COMPLETE:
        return (
          <p className="text">
            아주아주아주아주 훌륭해!!!
            <br />
            우리 함께 토요일을 불태우자!! 🔥🔥🔥
          </p>
        );
      default:
        break;
    }
  };

  return (
    <Container>
      <img className="man" src={OPTION[type].man} alt="" />
      <div className="bottom">{renderText()}</div>
      <div className="name">나루호도</div>
    </Container>
  );
};

export default Bottom;

const Container = styled.div`
  .man {
    position: absolute;
    width: 320px;
    bottom: 160px;
    left: 0px;
  }
  .bottom {
    width: 100%;
    height: 120px;
    padding: 25px 5%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 42px;
    display: flex;
    flex-direction: column;
    .text {
      font-family: "Pretendard";
      font-size: 12px;
      font-weight: 300;
      color: white;
      line-height: 24px;
    }
  }
  .name {
    position: absolute;
    width: 60px;
    height: 15px;
    background-color: #5a92ae;
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
    bottom: calc(160px - 15px / 2 + 2px);
    left: 5%;

    color: white;
    text-align: center;
    font-family: "Pretendard";
    font-size: 10px;
  }
`;

type OptionType = {
  [key: string]: {
    man: string;
  };
};

const OPTION: OptionType = {
  [Stage.MISSION]: { man: man1 },
  [Stage.MISSIONFAIL]: { man: man2 },
  [Stage.FIRST]: { man: man7 },
  [Stage.FIRSTFAIL]: { man: man4 },
  [Stage.SECOND]: { man: man7 },
  [Stage.SECONDFAIL]: { man: man9 },
  [Stage.COMPLETE]: { man: man5 },
};
