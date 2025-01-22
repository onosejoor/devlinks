const Label: React.FC<{ text: string, error?: boolean }> = ({ text, error }) => {
  return (
    <>
      <label className={`text-darkGray text-sm capitalize font-semibold ${error ? "text-red": ""} `}>{text}</label>
    </>
  );
};

export default Label