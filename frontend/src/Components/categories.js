import { IoIosCafe, IoMdRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaShoppingBag, FaTshirt, FaQuestion } from "react-icons/fa";
import { RiMedicineBottleFill, RiComputerFill } from "react-icons/ri";
import { HiEmojiHappy } from "react-icons/hi";

const CATEGORIES = {
  UNKNOWN: "Unknown",
  FOOD_AND_DRINKS: "Food & Drinks",
  BAR_AND_CAFE: "Bar & Cafè",
  SHOPPING: "Shopping",
  GROCERIES: "Groceries"
};

const CATEGORIES_ICON_ENUM = [
  {
    name: CATEGORIES.UNKNOWN,
    icon: <FaQuestion style={{color: "white"}}/>,
    color: "rgb(60, 60, 60)"
  },
  {
    name: CATEGORIES.FOOD_AND_DRINKS,
    icon: <IoFastFood style={{ color: "white" }} />,
    color: "red",
    subCategories: [
      {
        name: CATEGORIES.FOOD_AND_DRINKS,
        icon: <IoFastFood style={{ color: "white" }} />,
        color: "red",
      },
      {
        name: CATEGORIES.BAR_AND_CAFE,
        icon: <IoIosCafe style={{ color: "white" }} />,
        color: "red",
      },
    ],
  },
  {
    name: CATEGORIES.SHOPPING,
    icon: <FaShoppingBag style={{ color: "white" }} />,
    color: "blue",
    subCategories: [
      {
        name: CATEGORIES.SHOPPING,
        icon: <FaShoppingBag style={{ color: "white" }} />,
        color: "blue",
      },
      {
        name: CATEGORIES.GROCERIES,
        icon: <MdLocalGroceryStore style={{color: "white"}} />,
        color: "blue"
      }
    ],
  },
];

function _buildCategoriesApp(categories) {
  let subtree = [];
  if (categories === undefined) {
    return [];
  }

  for (const item of categories) {
    let newCat = {
      text: item.name,
      value: item.name,
      label: (
        <>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              background: item.color,
            }}
          >
            {item.icon}
          </span>
          &nbsp; {item.name}
        </>
      ),
    };
    newCat.submenu = _buildCategoriesApp(item.subCategories);
    subtree.push(newCat);
  }

  return subtree;
}

function build_categories_tree() {
  return _buildCategoriesApp(CATEGORIES_ICON_ENUM);
}

export function findCategoryByValue(data, parent, value) {
  for(const category of data) {
    if(category.text === value && (category.submenu === undefined || category.submenu.length == 0)) {
      return [[data], parent, category.label];
    }

    if(category.submenu !== undefined && category.submenu.length > 0) {
      const [state, parent, label] = findCategoryByValue(category.submenu, category.text, value);

      if(state.length > 0) {
        return [state.concat([data]), parent, label];
      }
    }
  }

  return [[], "", null];
}

export const category_tree = build_categories_tree();
