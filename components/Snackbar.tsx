export const Snackbar = ({ opacity, message }) => {
  return (
    <div
      className="fixed inset-x-0 bottom-5 mx-4 md:mx-28 p-4 flex items-center justify-center
        bg-red-500 text-white text-sm font-bold px-4 py-3 transition-opacity duration-500 ease-in-out rounded-md"
      style={{ opacity: opacity }}
      role="alert"
    >
      <p className="text-base font-semibold">{message}</p>
    </div>
  );
};
