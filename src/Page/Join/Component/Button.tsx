import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import pattern from "../../../Asset/Img/pattern.png";

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
  onClickBtn1: () => void;
  onClickBtn2: () => void;
};

const Button = ({ type, onClickBtn1, onClickBtn2 }: Props) => {
  const [opacity, setOpacity] = useState(0);
  let isOn = true;
  let count = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isOn) {
        if (count >= 1) {
          count = 0.9;
          isOn = false;
        } else {
          count += 0.1;
        }
      } else {
        if (count <= 0.3) {
          count = 0.4;
          isOn = true;
        } else {
          count -= 0.1;
        }
      }
      setOpacity(count);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container opacity={opacity} pattern={pattern}>
      <div className="btn one on" onClick={() => onClickBtn1()}>
        <div className="pattern">
          <p className="text first">{OPTION[type].text1}</p>
        </div>
      </div>
      <div className="btn two" onClick={() => onClickBtn2()}>
        <p className="text second">{OPTION[type].text2}</p>
      </div>
    </Container>
  );
};

export default Button;

const Container = styled.div<{ opacity: number; pattern?: string }>`
  .btn {
    position: absolute;
    width: 250px;
    height: 50px;
    left: calc(50% - 250px / 2);
    background-color: rgba(0, 0, 0, 0.8);

    .text {
      font-family: "Pretendard";
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: white;
    }
    .first {
      margin-top: calc(25px - 25px / 2);
    }
    .second {
      margin-top: calc(25px - 21px / 2);
    }
  }
  .one {
    bottom: 420px;
  }
  .two {
    bottom: calc(420px - 80px);
  }
  .on {
    border: 0.5px solid rgba(178, 147, 28, ${(props) => props.opacity});
    .pattern {
      width: 100%;
      height: 100%;
      border: 2px solid;
      border-image-source: url(${(props) => props.pattern});
    }
  }
`;

type OptionType = {
  [key: string]: {
    text1: string;
    text2: string;
  };
};

const OPTION: OptionType = {
  [Stage.MISSION]: { text1: "미션 신청 할게요!!", text2: "아쉽지만.. ㅜㅜ" },
  [Stage.MISSIONFAIL]: {
    text1: "잘못했어.. 미션2는 꼭 가야지!",
    text2: "진짜 안간다",
  },
  [Stage.FIRST]: { text1: "뒤풀이 1차 가즈아!!", text2: "1차는 좀 힘들듯.." },
  [Stage.FIRSTFAIL]: {
    text1: "알았어! 뒤풀이 1차 참여할게!",
    text2: "아쉽지만 힘들겠다",
  },
  [Stage.SECOND]: {
    text1: "뒤풀이 2차는 못참지!!",
    text2: "2차 까진 힘들듯..",
  },
  [Stage.SECONDFAIL]: {
    text1: "내가 함 2차 가준다!",
    text2: "2차는 시간이 안돼~",
  },
};
