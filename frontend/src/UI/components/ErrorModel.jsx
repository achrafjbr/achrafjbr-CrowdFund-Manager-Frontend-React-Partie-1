function ErrorModel({ error }) {
  if (error) {
    return (
      <div
        className="
          absolute from-cyan-700 to-blue-900 z-40
          shadow-2xl rounded-2xl
          top-1/2 left-1/2 w-[20%] h-[20%]
          translate-x-[-50%] translate-y-[-50%]
          flex justify-center items-center "
      >
        {error}
      </div>
    );
  }
}

export default ErrorModel;
