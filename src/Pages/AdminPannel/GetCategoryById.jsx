import React from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GetCategory() {
  const [CategoryData, setCategoryData] = useState({
    title: "",
    slug: "",
  });
  const { authorizationToken, API } = useAuth();

  const navigate = useNavigate();
  const URL = `${API}/api/admin/add-category`;

  const handleCategoryInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // Convert title to slug and replace spaces with dashes
    if (name === "title") {
      const slugValue = value.toLowerCase().replace(/\s+/g, "-");
      setCategoryData({
        ...CategoryData,
        [name]: value,
        slug: slugValue,
      });
    } else {
      setCategoryData({
        ...CategoryData,
        [name]: value,
      });
    }
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/adminv1/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(CategoryData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Category added successfully");
        setCategoryData({
          title: "",
          slug: "",
        });
        navigate("/manage-category");
      } else {
        toast.error("Failed to add Category");
      }
    } catch (error) {
      alert("Category not Added");
      console.log(error);
    }
  };
  return (
    <>
      <TopBarAdmin />
      <main>
        <div className="container-fluid">
          <div class="row">
            <div class="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div class="col-md-9 adminright">
              <div className="addblog">
                <div>
                  <div className="addblogform">
                    <h2>
                      Add Doctor
                      <Link to="/manage-category" className="btn btn-light ss">
                        View Category
                      </Link>
                    </h2>
                    <form
                      onSubmit={handleCategory}
                      enctype="multipart/form-data"
                    >
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label for="title" class="form-label">
                            Category's Name
                          </label>
                          <input
                            name="title"
                            autoComplete="off"
                            value={CategoryData.title}
                            onChange={handleCategoryInput}
                            id="title"
                            required
                            type="text"
                            class="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="slug" class="form-label">
                            Category Slug
                          </label>
                          <input
                            name="slug"
                            autoComplete="off"
                            value={CategoryData.slug}
                            onChange={handleCategoryInput}
                            id="slug"
                            required
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Add Doctor
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default GetCategory;
