import WriteSmall from "../components/board/WriteSmall";

export default function WriteSmallPage() {
  return (
    <WriteSmall>
      <div>
        <WriteSmall.UploadImg />
        <WriteSmall.SetTitle />
        {/* <WriteSmall.SelectDate /> */}
        <WriteSmall.WriteContext />
      </div>
    </WriteSmall>
  );
}
