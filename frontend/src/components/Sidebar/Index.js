import { Link } from "react-router-dom";

export default function Index({ categories }) {
  return (
    <div className="flow-root">
      <nav aria-label="Main Nav" className="flex flex-col space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <strong className="block text-xs font-medium uppercase text-gray-400">
              {category.title}
            </strong>

            <ul className="mt-2 space-y-1">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    to={`/u/scategory/${subcategory.id}`}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    {subcategory.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
