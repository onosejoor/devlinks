const Toast = ({ message }: { message: string }) => {
  return (
    <>
      <div className="fixed bottom-0 bg-gray text-white">{message}</div>
    </>
  );
};

export default Toast;
