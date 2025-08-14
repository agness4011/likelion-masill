// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function SelectCategory() {
//   const [category, setCategory] = useState("");
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (!category) {
//       alert("카테고리를 선택해주세요.");
//       return;
//     }

//     // WriteBoard 페이지로 category를 state로 넘김
//     navigate("/write", { state: { category } });
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={() => navigate(-1)}>{`<`}</button>
//         <h1>카테고리 선택</h1>
//       </div>

//       <div>
//         <button onClick={() => setCategory("market")}>플리마켓</button>
//         <button onClick={() => setCategory("food")}>음식</button>
//         <button onClick={() => setCategory("art")}>문화/예술</button>
//         <button onClick={() => setCategory("outdoor")}>야외활동</button>
//         {/* 나머지도 자유롭게 추가 */}
//       </div>

//       <div>
//         <button onClick={handleNext}>다음</button>
//       </div>
//     </div>
//   );
// }
export default function SelectCategory() {}
