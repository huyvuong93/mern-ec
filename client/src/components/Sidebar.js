import {Link} from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Menu 1",
      link: "/products/category1"
    },
    {
      title: "Menu 2",
      link: "/products/category2"
    },
    {
      title: "Menu 3",
      link: "/products/category3"
    },
  ]
  return (
    <div className="sticky-top w-100 text-lg-start overflow-hidden">
      {menuItems.map(item => (
        <div className="p-2 border-bottom pointer-event" key={item.title}>
          <Link className="text-decoration-none text-black-50" to={item.link}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}