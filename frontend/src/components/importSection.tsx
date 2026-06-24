import * as Styled from "../styles/styledComponents";

type Props = {
  setSelectedFile: (file: File | null) => void;
  uploadTextFile: () => void;
};

export default function ImportSection({
  setSelectedFile,
  uploadTextFile,
}: Props) {
  return (
    <Styled.ImportSection>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          if (e.target.files) {
            setSelectedFile(e.target.files[0]);
          }
        }}
      />

      <Styled.ActionButton onClick={uploadTextFile}>
        Import TXT
      </Styled.ActionButton>
    </Styled.ImportSection>
  );
}