import React from "react";

const CategoryTag = ({ category }: { category: string }) => {
  const categoryLowerCase = category.toLowerCase();
  const colorsClasses = {
    entertainment:
      "bg-category-entertainment text-category-entertainment-foreground",
    productivity:
      "bg-category-productivity text-category-productivity-foreground",
    cloud: "bg-category-cloud text-category-cloud-foreground",
    finance: "bg-category-finance text-category-finance-foreground",
    education: "bg-category-education text-category-education-foreground",
    health: "bg-category-health text-category-health-foreground",
    gaming: "bg-category-gaming text-category-gaming-foreground",
    news: "bg-category-news text-category-news-foreground",
    utilities: "bg-category-utilities text-category-utilities-foreground",
    shopping: "bg-category-shopping text-category-shopping-foreground",
    other: "bg-category-other text-category-other-foreground",
  };

  return (
    <div
      className={`${
        colorsClasses[categoryLowerCase as keyof typeof colorsClasses] ||
        colorsClasses.other
      } rounded-md px-2 py-1 text-sm w-fit`}
    >
      {category?.charAt(0).toUpperCase() + category?.slice(1)}
    </div>
  );
};

export default CategoryTag;
