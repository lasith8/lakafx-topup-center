const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/94740482490"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="w-16 h-16 rounded-full bg-green-500 hover:scale-110 transition flex items-center justify-center shadow-2xl">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-9 h-9"
        />

      </div>
    </a>
  );
};

export default FloatingWhatsApp;