import React from "react";
import Category from "./Category";

export default function Categories({
  categories,
  removeWidget,
  openAddWidgetModal,
}) {
  return (
    <div className="px-10">
      {categories?.map((category) => (
        <Category
          key={`category-${category.id}`}
          category={category}
          removeWidget={removeWidget}
          openAddWidgetModal={openAddWidgetModal}
        />
      ))}
    </div>
  );
}
