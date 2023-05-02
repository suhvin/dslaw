import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import onToast from "../Toast/onToast";
import { useUserStore } from "../../Store/user-store";
import { isValidName, isValidPw, isValidUniv } from "../../Util/Validator";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  func: (value: void) => void;
  opacity: number;
};

const ModalConfirm = ({ isOpen, setIsOpen, func, opacity }: Props) => {
  // toast 사용
  const toast = useToast();

  // zustand
  const { userName, userUniv, userPw, setUserName, setUserUniv, setUserPw } =
    useUserStore();

  // 초기값 설정 zustand > localStorage > ""
  const [name, setName] = useState(
    userName !== "" ? userName : localStorage.getItem("dslaw_name") ?? ""
  );
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };
  const [univ, setUniv] = useState(
    userUniv !== "" ? userUniv : localStorage.getItem("dslaw_univ") ?? ""
  );
  const onChangeUniv = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniv(event.currentTarget.value);
  };
  const [pw, setPw] = useState(
    userPw !== "" ? userPw : localStorage.getItem("dslaw_pw") ?? ""
  );
  const onChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.currentTarget.value);
  };

  // 값 확인
  const valid = () => {
    if (isValidName(name)) {
      if (isValidUniv(univ)) {
        if (isValidPw(pw)) {
          // 모달 닫기
          setIsOpen(false);
          // zustand 값 업데이트
          setUserName(name);
          setUserUniv(univ);
          setUserPw(pw);
          // localStorage 값 업데이트
          localStorage.setItem("dslaw_name", name);
          localStorage.setItem("dslaw_univ", univ);
          localStorage.setItem("dslaw_pw", pw);
          func();
        } else {
          onToast({
            toast: toast,
            status: "error",
            title: "숫자 4자리를 입력해주세요!",
          });
        }
      } else {
        onToast({
          toast: toast,
          status: "error",
          title: "학교를 입력해주세요!",
        });
      }
    } else {
      onToast({
        toast: toast,
        status: "error",
        title: "이름을 입력해주세요!",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent
          w="240px"
          h="330px"
          pt="32px"
          pl="25px"
          pr="25px"
          mt="calc(var(--vh, 1vh) * 50 - 330px/2)"
          ml="0px"
          position="relative"
          background="black"
          borderRadius="0px"
          border="0.5px solid #5A6477"
        >
          <Title color="white" titleSize={16}>
            누구인지 알려주세요
          </Title>
          <Input
            mt="36px"
            p="2px"
            borderColor="#5A6477"
            variant="flushed"
            focusBorderColor="none"
            placeholder="이름"
            color="white"
            fontSize="13px"
            textAlign="left"
            value={name}
            onChange={onChangeName}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Input
              w="180%"
              mt="18px"
              mr="18px"
              p="2px"
              borderColor="#5A6477"
              variant="flushed"
              focusBorderColor="none"
              placeholder="학교"
              color="white"
              fontSize="13px"
              textAlign="left"
              value={univ}
              onChange={onChangeUniv}
            />
            <Input
              w="80%"
              mt="18px"
              p="2px"
              borderColor="#5A6477"
              variant="flushed"
              focusBorderColor="none"
              placeholder="비번"
              color="white"
              fontSize="13px"
              textAlign="left"
              type="number"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.slice(0, 4);
              }}
              value={pw}
              onChange={onChangePw}
            />
          </div>

          <Text margin={20} size={10}>
            비번은 숫자(4자리)로 잊으면 안됩니다!
          </Text>
          <BtnBox margin={40}>
            <BtnConfirm opacity={opacity} onClick={() => valid()}>
              미션 신청하기
            </BtnConfirm>
          </BtnBox>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalConfirm;

const Title = styled.p<{ color?: string; titleSize?: number }>`
  height: 24px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => (props.titleSize ? props.titleSize : "14")}px;
  line-height: 20px;
  text-align: center;

  color: ${(props) => (props.color ? props.color : "black")};
`;

const Text = styled.p<{ margin?: number; size?: number }>`
  margin-top: ${(props) => (props.margin ? props.margin : "24")}px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => (props.size ? props.size : "12")}px;
  line-height: 12px;
  text-align: right;

  color: #fc8181;
`;

const BtnBox = styled.div<{ margin?: number }>`
  width: 100%;
  height: 32px;
  margin-top: ${(props) => (props.margin ? props.margin : "24")}px;
  display: flex;
  justify-content: space-between;
`;

const BtnConfirm = styled.button<{ opacity: number; pattern?: string }>`
  width: 100%;
  height: 32px;
  background: #000000;
  border: 1px solid white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: white;
  opacity: ${(props) => props.opacity};
`;
