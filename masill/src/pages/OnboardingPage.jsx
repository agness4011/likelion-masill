import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingContainer from "@components/onboarding/OnboardingContainer";
import OnboardingSlide from "@components/onboarding/OnboardingSlide";
import OnboardingButton from "@components/onboarding/OnboardingButton";

const slides = [
  {
    image: <div>Logo</div>,
    title: "마실 masill",
    subtitle: "예시: 마실과 함께 이벤트 가득한 하루를 만들어요 슬로건!!!",
  },
  {
    image: <div>Screen 2 Image</div>,
    title: "",
    subtitle: "",
  },
];

export default function OnboardingPage() {
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();

  const handleNext = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else nav("/login");
  };

  return (
    <OnboardingContainer>
      <OnboardingSlide {...slides[idx]} />
      <OnboardingButton onClick={handleNext}>
        {idx < slides.length - 1 ? "다음" : "시작"}
      </OnboardingButton>
    </OnboardingContainer>
  );
}
