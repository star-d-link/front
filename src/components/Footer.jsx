const Footer = () => {
  return (
    <footer className="bg-gray-50 text-center py-4 text-sm text-gray-500">
      <p>© 2024 Star-D-Link</p>
      <ul className="flex justify-center space-x-4 mt-2">
        <li>
          <a href="/" className="hover:underline">
            Star-D-Link 소개
          </a>
        </li>
        <li>
          <a href="/" className="hover:underline">
            이용약관
          </a>
        </li>
        <li>
          <a href="/" className="hover:underline">
            개인정보처리방침
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
