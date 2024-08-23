import { useEffect, useState } from "react";
import AddWidgetModal from "./components/AddWidgetModal";
import Categories from "./components/Categories";
import CtaBar from "./components/CtaBar";
import TopBar from "./components/TopBar";

const categoriesJSON = [
  {
    id: 1,
    name: "CSPM Executive Dashboard",
    widgets: [{ id: 1, name: "Widget 1", text: "Widget1 Text", inUse: true }],
  },
  {
    id: 2,
    name: "CWPP Dashboard",
    widgets: [],
  },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const removeWidgetHandler = (categoryId, widgetId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      setCategories(categoriesJSON);
    }
  }, []);

  return (
    <div className="App bg-[#F0F5FA] h-screen w-full overflow-auto">
      <TopBar />
      <CtaBar openAddWidgetModal={handleOpenModal} />
      <Categories
        categories={categories}
        removeWidget={removeWidgetHandler}
        openAddWidgetModal={handleOpenModal}
      />
      {isModalOpen && (
        <AddWidgetModal
          open={isModalOpen}
          onClose={handleCloseModal}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  );
}

export default App;
