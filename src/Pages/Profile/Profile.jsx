import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = use(AuthContext);
  const [mybook, setMyBooks] = useState([]);
  const navigate = useNavigate();
  if(!user){
      navigate('/login')
  }
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((book) => book.user_email === user.email);
        setMyBooks(filterData);
      });
  }, [user]);

  const catFilter = mybook.map((book) => book.book_category);
  const singleCat = [...new Set(catFilter)];

  const catCount = {};
  mybook.forEach((book) => {
    const cat = book.book_category;
   
    catCount[cat] = (catCount[cat] ?? 0) + 1;
  });

  const chartData = Object.entries(catCount).map(([name,value])=>({
    name,value
  }));
  

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-indigo-700">{user?.displayName}</h2>
            <p className="text-gray-600 text-lg">{user?.email}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              📚 Bookshelf Summary
            </h3>
            <p className="text-gray-800 text-base">
              Total Books: <span className="font-bold">{mybook.length}</span>
            </p>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold text-indigo-600 mb-2"> Categories :</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {singleCat.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Chart under categories */}
            <div className="w-full h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar
                    dataKey="value"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
