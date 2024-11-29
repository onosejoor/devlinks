const Label: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <label className="text-darkGray text-sm capitalize font-semibold ">{text}</label>
    </>
  );
};

export default Label