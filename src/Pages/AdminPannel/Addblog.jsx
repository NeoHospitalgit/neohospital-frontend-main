import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function Addblog() {
  const formatDate = (dateString) => {
    const blogDate = new Date(dateString).toISOString().split("T")[0];
    return `${blogDate}`;
  };

  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv3/blogs`;

  const [blogsData, setBlogsData] = useState({
    blog_title: "",
    blog_slug: "",
    blog_date: new Date().toISOString().split("T")[0],
    blog_auther: "Tanu Jaiswal",
    blog_category: "blog",
    blog_image: null,
    blog_content: "",
    blog_seo: "",
    blog_imageALT: "",
    blog_whoIsAdded: "",
    blog_status: true,
  });

  useEffect(() => {
    if (id) {
      fetchblogData();
    }
  }, [id]);

  const fetchblogData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv3/blogs/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogsData(data);
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleBlogInput = (e) => {
    const { name, value } = e.target;
    const transformedValue = name === "blog_status" ? value === "true" : value;
    const modifiedValue =
      name === "blog_slug"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
        : transformedValue;

    setBlogsData({
      ...blogsData,
      [name]: modifiedValue,
    });

    if (name === "blog_title") {
      setBlogsData((prevState) => ({
        ...prevState,
        blog_slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      }));
    }

    // Update blog_date separately
    if (name === "blog_date") {
      setBlogsData((prevState) => ({
        ...prevState,
        blog_date: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setBlogsData({
      ...blogsData,
      blog_image: e.target.files[0],
    });
  };

  const handleQualificationChange = (newContent) => {
    setBlogsData({
      ...blogsData,
      blog_content: newContent,
    });
  };

  const addBlogs = async () => {
    try {
      const formData = new FormData();
      // Object.entries(blogsData).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      formData.append("blog_title", blogsData.blog_title);
      formData.append("blog_slug", blogsData.blog_slug);
      formData.append("blog_content", blogsData.blog_content);
      formData.append("blog_date", blogsData.blog_date);
      formData.append("blog_auther", blogsData.blog_auther);
      formData.append("blog_image", blogsData.blog_image);
      formData.append("blog_category", blogsData.blog_category);
      formData.append("blog_imageALT", blogsData.blog_imageALT);
      formData.append("blog_whoIsAdded", blogsData.blog_whoIsAdded);
      formData.append("blog_seo", blogsData.blog_seo);
      formData.append("blog_status", blogsData.blog_status);

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-blog");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const resetForm = () => {
    setBlogsData({
      blog_title: "",
      blog_slug: "",
      blog_date: new Date().toISOString().split("T")[0],
      blog_auther: "Tanu Jaiswal",
      blog_category: "blog",
      blog_image: null,
      blog_content: "",
      blog_seo: "",
      blog_imageALT: "",
      blog_whoIsAdded: "",
      blog_status: true,
    });
  };

  const updateBlog = async () => {
    try {
      const formData = new FormData();
      // Object.entries(blogsData).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      formData.append("blog_title", blogsData.blog_title);
      formData.append("blog_slug", blogsData.blog_slug);
      formData.append("blog_content", blogsData.blog_content);
      formData.append("blog_date", blogsData.blog_date);
      formData.append("blog_auther", blogsData.blog_auther);
      formData.append("blog_image", blogsData.blog_image);
      formData.append("blog_category", blogsData.blog_category);
      formData.append("blog_imageALT", blogsData.blog_imageALT);
      formData.append("blog_whoIsAdded", blogsData.blog_whoIsAdded);
      formData.append("blog_seo", blogsData.blog_seo);
      formData.append("blog_status", blogsData.blog_status);

      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-blog");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleBlogs = (e) => {
    e.preventDefault();
    id ? updateBlog() : addBlogs();
  };

  return (
    <>
      <TopBarAdmin />
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div className="col-md-9 adminright">
              <div className="addblog">
                <div>
                  <div className="addblogform">
                    <h2>Add Blog</h2>
                    <form onSubmit={handleBlogs} encType="multipart/form-data">
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="blog_title" className="form-label">
                            Title
                          </label>
                          <input
                            name="blog_title"
                            autoComplete="off"
                            value={blogsData.blog_title}
                            onChange={handleBlogInput}
                            id="blog_title"
                            required
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="blog_slug" className="form-label">
                            Slug
                          </label>
                          <input
                            name="blog_slug"
                            autoComplete="off"
                            value={blogsData.blog_slug}
                            onChange={handleBlogInput}
                            id="blog_slug"
                            required
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="blog_image" className="form-label">
                            Image
                          </label>
                          <input
                            name="blog_image"
                            autoComplete="off"
                            onChange={handleFileChange}
                            id="blog_image"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            className="form-control"
                          />
                          {id && blogsData.blog_image && (
                            <div>
                              <img
                                src={`${API}/uploads/blogs/${blogsData.blog_image}`}
                                width="200px"
                                height="auto"
                                alt="blogs Image"
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="blog_imageALT" className="form-label">
                            Image ALT
                          </label>
                          <input
                            name="blog_imageALT"
                            autoComplete="off"
                            value={blogsData.blog_imageALT}
                            onChange={handleBlogInput}
                            id="blog_imageALT"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="blog_category" className="form-label">
                            Category
                          </label>
                          <input
                            name="blog_category"
                            autoComplete="off"
                            value={blogsData.blog_category}
                            onChange={handleBlogInput}
                            id="blog_category"
                            required
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="blog_date" className="form-label">
                            Date
                          </label>
                          <input
                            name="blog_date"
                            autoComplete="off"
                            value={formatDate(blogsData.blog_date)}
                            onChange={handleBlogInput}
                            id="blog_date"
                            required
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="blog_auther" className="form-label">
                            Author
                          </label>
                          <input
                            name="blog_auther"
                            autoComplete="off"
                            value={blogsData.blog_auther}
                            onChange={handleBlogInput}
                            id="blog_auther"
                            required
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mt-4"></div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="blog_status" className="form-label">
                            Blog Status
                          </label>
                          <select
                            name="blog_status"
                            autoComplete="off"
                            value={blogsData.blog_status ? "1" : "0"}
                            onChange={handleBlogInput}
                            id="blog_status"
                            required
                            className="form-control"
                          >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="blog_whoIsAdded"
                            className="form-label"
                          >
                            Blog User
                          </label>
                          <input
                            name="blog_whoIsAdded"
                            autoComplete="off"
                            value={blogsData.blog_whoIsAdded}
                            onChange={handleBlogInput}
                            id="blog_whoIsAdded"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="blog_seo" className="form-label">
                            Seo Tags
                          </label>
                          <textarea
                            name="blog_seo"
                            autoComplete="off"
                            value={blogsData.blog_seo}
                            onChange={handleBlogInput}
                            id="blog_seo"
                            rows="9"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="blog_content" className="form-label">
                            Blog Content
                          </label>
                          <JoditEditor
                            ref={null}
                            id="blog_content"
                            className="form-control"
                            autoComplete="off"
                            value={blogsData.blog_content}
                            name="blog_content"
                            onChange={handleQualificationChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Submit
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

export default Addblog;
