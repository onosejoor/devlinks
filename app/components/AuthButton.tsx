export default function AuthButton({ text }: { text: string }) {
  return (
    <>
      <button
        type="submit"
        className="w-full text-center py-2 rounded-md text-white bg-ogColor "
      >
        {text}
      </button>
    </>
  );
}
