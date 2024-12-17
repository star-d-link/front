import MainContent from "../components/MainContent";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col flex-1">
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
